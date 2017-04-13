/**
 * Created by raphael on 4/10/17.
 */

const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var models = require('../models/index');
const moment = require('moment');

module.exports = function(app){

    Fichas = app.serverSide.models.index.Fichas;
    ListaProblemas = app.serverSide.models.index.ListaProblemas;
    Pendencias = app.serverSide.models.index.Pendencias;
    Evolucao = app.serverSide.models.index.Evolucao;
    Dispositivos = app.serverSide.models.index.Dispositivos;
    Internacao = app.serverSide.models.index.Internacao;
    var evolucaoController = {
        getAllEvolucaoByIdPacientePorInternacaoMaisRecente: function (req,res) {
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                Fichas.findAll({
                    include:[
                        {model: ListaProblemas,required:false},
                        {model: Pendencias,required:false},
                        {model: Evolucao,required:true}
                    ],
                    where:{
                        IDPaciente: req.query.idPaciente
                    }
                }).then(function (result) {
                    Internacao.findOne({
                        where:{
                            ID: req.query.idPaciente,
                            DataAlta: null
                        }
                    }).then(function (results) {
                        res.json(filtrarFichasEvolucao(result,results.dataValues.DataInternacao));
                    });
                });
            }catch(err){
                res.sendStatus(401);
            }
        },
        salvarFichaEvolucao: function (req,res) {
            try {
                Jwt.verify(req.headers.access_token, privateKey);
                console.log("MOMENT QUE O NODE CONVERTE: "+moment().format('YYYY-MM-DD H:m:s'));
                Fichas.create({
                    Registro: parseInt(req.query.RegistroMedico),
                    IDPaciente: parseInt(req.query.idPaciente),
                    DataCriado: moment().format('YYYY-MM-DD H:m:s'),
                    DataModificado: moment().format('YYYY-MM-DD H:m:s')
                }).then(function (result) {

                })
            } catch (err) {
                res.sendStatus(401);
            }
        }
    };
    function filtrarFichasEvolucao(fichas,date){
         for(var i=fichas.length-1;i>=0;i--)
             if (fichas[i].DataCriado < date)
                 fichas.splice(i, 1);
        return fichas;
    }
    return evolucaoController;
};
