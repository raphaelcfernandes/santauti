/**
 * Created by raphael on 4/4/17.
 */
const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const moment = require('moment');
const privateKey = Config.key.privateKey;
var models = require('../models/index');
moment.locale('pt-br');
module.exports = function(app){
    Dispositivos = app.serverSide.models.index.Dispositivos;
    Internacao = app.serverSide.models.index.Internacao;
    var dispositivosController = {
        getAllDispositivosByLastDataInternacaoAndByIdPaciente: function (req,res) {
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                models.sequelize.query('SELECT * FROM Dispositivos WHERE DataInicio > (SELECT max(DataInternacao) FROM Internacao WHERE ID=:ID AND DataAlta IS NULL);',
                    { replacements: {ID: req.query.idPaciente}, type: models.sequelize.QueryTypes.SELECT }
                ).then(function (result) {
                    res.json(result);
                });
            }catch(err){
                res.sendStatus(401);
            }
        },
        newDispositivosByIdPaciente: function (req,res) {
            var dispositivos=req.body.Dispositivos;
            var idPaciente = parseInt(req.body.idPaciente);
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                 for(var i=dispositivos.length-1;i>=0;i--) {
                     Dispositivos.create({
                         IDPaciente: idPaciente,
                         DataInicio: moment(dispositivos[i].DataInsercao, 'DD [de] MMMM [de] YYYY [às] H:m').format("YYYY-MM-DD H:m"),
                         DispositivoDescricao: dispositivos[i].DispositivoDescricao
                     }).then(function () {
                         res.sendStatus(201);
                     });
                 }
            }catch(err){
                res.sendStatus(401);
            }
        },
        updateDispositivosByIdDispositivoEByIdPaciente: function (req,res) {
            var dispositivos=req.body.Dispositivos;
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                for(var i=dispositivos.length-1;i>=0;i--) {
                    models.sequelize.query('UPDATE Dispositivos SET DataFim=:DataFim, DispositivoDescricao=:DispositivoDescricao WHERE IDDispositivo=:IDDispositivo;',
                        { replacements: {DataFim: moment(dispositivos[i].DataFim, 'DD [de] MMMM [de] YYYY [às] H:m').format("YYYY-MM-DD H:m"),
                            DispositivoDescricao:dispositivos[i].DispositivoDescricao,IDDispositivo:dispositivos[i].IDDispositivo}, type: models.sequelize.QueryTypes.UPDATE });
                }
                res.sendStatus(201);
            }catch(err){
                res.sendStatus(401);
            }
        }
    };
    return dispositivosController;
};
