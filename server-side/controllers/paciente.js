/**
 * Created by raphael on 3/28/17.
 */
const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var models = require('../models/index');

module.exports = function(app){
    Paciente = app.serverSide.models.index.Paciente;
    Profissional = app.serverSide.models.index.Profissional;
    Pessoa = app.serverSide.models.index.Pessoa;
    Dispositivos = app.serverSide.models.index.Dispositivos;
    var pacienteController = {
        /**
         * Obtem os dados de TODOS os pacientes
         * @param req
         * @param res
         */
        getPacientes: function (req,res) {
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                models.sequelize.query("SELECT p2.*,p3.ID,p3.Nome,p3.Sobrenome,p1.Nome AS NomeMedico,p1.Sobrenome AS SobrenomeMedico " +
                    "FROM Pessoa p3 INNER JOIN (Paciente p2 INNER JOIN (Profissional p4  INNER JOIN Pessoa p1 ON p1.ID = p4.ID) ON p2.Responsavel = p4.Registro)" +
                    "ON p3.ID = p2.ID;", { type: models.sequelize.QueryTypes.SELECT})
                    .then(function (results) {
                        res.json(results);
                    });
            }catch(err){
                res.sendStatus(401);
            }
        },
        /**
         * Obtem os dados de UM paciente, dado seu ID
         * @param req
         * @param res
         */
        getDadosPacienteByIdPacienteAndByUltimaInternacao: function (req,res) {
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                Paciente.findOne({//PEGA TODOS OS DADOS DO PACIENTE
                    include:[
                        {model: Profissional,required:true,attributes:['ID']},
                        {model: Pessoa,required:true},
                        {model: Internacao, required:true,where:{DataAlta: null}}],
                    where:{
                        ID: parseInt(req.query.idPaciente)
                    }
                }).then(function (result) {//PEGA NOME E SOBRENOME DO MEDICO RESPONSAVEL
                    Pessoa.findOne({
                        where:{
                            ID: result.Profissional.ID
                        },
                        attributes:[
                            'Nome','Sobrenome']
                    }).then(function (results) {
                        var obj = {
                            paciente: result,
                            profissional:results
                        };
                        delete (obj.paciente.dataValues.Profissional);
                        res.json(obj);
                    });
                })
            }catch(err){
                res.sendStatus(401);
            }
        }
    };
    return pacienteController;
};