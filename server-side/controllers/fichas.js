/**
 * Created by raphael on 3/31/17.
 */

const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var models = require('../models/index');

module.exports = function(app){

    Fichas = app.serverSide.models.index.Fichas;
    ListaProblemas = app.serverSide.models.index.ListaProblemas;
    Pendencias = app.serverSide.models.index.Pendencias;
    Evolucao = app.serverSide.models.index.Evolucao;
    Dispositivos = app.serverSide.models.index.Dispositivos;
    var fichasController = {
        getFichasEvolucaoPorIdPaciente: function (req,res) {
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                Fichas.findAll({
                    include:[
                        {model: ListaProblemas,required:true},
                        {model: Pendencias,required:true},
                        {model: Evolucao,required:true}
                    ]
                }).then(function (result) {
                    Dispositivos.findAll({
                        where:{
                            IDPaciente: req.query.idPaciente
                        }
                    }).then(function (results){
                        var obj = {
                            Fichas: result,
                            Dispositivos:results
                        };
                        res.json(obj);
                    });
                });
            }catch(err){
                res.sendStatus(401);
            }
        },
        getPendenciasPorIdPaciente:function (req,res) {
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                Pendencias.findAll({
                    where:{
                        IDPaciente: req.query.idPaciente,
                        DataResolvido: null
                    }
                }).then(function (result) {
                    res.json(result);
                });
            }catch(err){
                res.sendStatus(401);
            }
        },
        sendFichaFromAppToServer:function (req,res) {
            console.log(req.body);
            try{
                Jwt.verify(req.headers.access_token, privateKey);
            }catch(err){
                res.sendStatus(401);
            }

        }
    };
    return fichasController;
};