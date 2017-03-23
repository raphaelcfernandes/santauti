/**
 * Created by raphael on 3/16/17.
 */

const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
const moment = require('moment');
var models = require('../models/index');


module.exports = function(app){
    Pessoa = app.serverSide.models.index.Pessoa;

    var pessoaController = {

        /**
         * RECEBE TOKEN E DATA DENTRO DE REQ.BODY.INFOPESSOA
         * VERIFICA SE TOKEN É ORIGINAL, CASO SEJA, TENTA INSERIR NO BANCO
         * SE SUCESSO RETORNA NOVO ID INSERIDO. CASO FALHE, RETORNA MSG DE ERRO DE ACORDO COM O ERRO
         * @param req
         * @param res
         * @param next
         */
        novoCadastroPessoa: function(req,res,next){
            req.body.infoPessoa.DataNascimento = moment(req.body.infoPessoa.DataNascimento,'DD/MM/YYYY').format("YYYY-MM-DD");
            try {
                Jwt.verify(req.headers.access_token, privateKey);
                Pessoa
                    .create({
                        CPF: req.body.infoPessoa.CPF,
                        Nome: req.body.infoPessoa.Nome,
                        Sobrenome: req.body.infoPessoa.Sobrenome,
                        Identidade: req.body.infoPessoa.Identidade,
                        DataNascimento: req.body.infoPessoa.DataNascimento,
                        Rua: req.body.infoPessoa.Rua,
                        Numero: req.body.infoPessoa.Numero,
                        Bairro: req.body.infoPessoa.Bairro,
                        Apartamento: req.body.infoPessoa.Apartamento,
                        Cep: req.body.infoPessoa.Cep,
                        Cidade: req.body.infoPessoa.Cidade,
                        Email: req.body.infoPessoa.Email
                    }).then(function(){
                    Pessoa.findOne({
                        where:{
                            CPF: req.body.infoPessoa.CPF
                        }
                    }).then(function(result){
                        res.json({ID:result.ID});
                    });
                }).catch(models.Sequelize.UniqueConstraintError,function (err) {
                    res.status(400).end(objToString(err.fields));
                })
            } catch(err) {
                res.sendStatus(401);
            }
        },
        buscaCadastroPessoa: function(req,res,next){
            try {
                Jwt.verify(req.headers.access_token, privateKey);
                Pessoa.findOne({
                    where:{
                        ID: req.query.idPessoa
                    },
                    attributes: [
                        'CPF','Nome','Sobrenome','Identidade','Rua','Numero','Bairro','Apartamento','Cep','Cidade','Email',
                        'DataNascimento',
                        [models.sequelize.fn('date_format', models.sequelize.col('DataNascimento'), '%d-%m-%Y'), 'DataNascimento']
                    ]
                }).then(function (result) {
                    res.json(result);
                });
            } catch(err) {
                res.sendStatus(401);
            }
        },

        updateCadastroPessoa: function(req,res,next) {
            try {
                Jwt.verify(req.headers.access_token, privateKey);
                Pessoa.findOne({
                    where: {ID: req.body.id}
                }).then(function (result) {
                    if (result) {
                        req.body.data.DataNascimento = moment(req.body.data.DataNascimento,'DD/MM/YYYY').format("YYYY-MM-DD");
                        result.updateAttributes({
                            CPF: req.body.data.CPF,
                            Nome: req.body.data.Nome,
                            Sobrenome: req.body.data.Sobrenome,
                            Identidade: req.body.data.Identidade,
                            Email: req.body.data.Email,
                            Rua: req.body.data.Rua,
                            Numero: req.body.data.Numero,
                            Apartamento: req.body.data.Apartamento,
                            Bairro: req.body.data.Bairro,
                            Cep: req.body.data.Cep,
                            Cidade: req.body.data.Cidade,
                            DataNascimento: req.body.data.DataNascimento
                        }).catch(models.Sequelize.UniqueConstraintError, function (err) {
                            res.status(400).end(objToString(err.fields));
                        });
                        res.sendStatus(201);
                    }
                })
            } catch (err) {
                res.sendStatus(401);
            }

        }
    };
    function objToString (obj) {
        var str = '';
        for (var p in obj)
            if (obj.hasOwnProperty(p))
                str += p;
        return str.slice(0,str.search("_"));
    }

    return pessoaController;
};