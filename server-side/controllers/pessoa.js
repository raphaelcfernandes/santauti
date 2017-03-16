/**
 * Created by raphael on 3/16/17.
 */
const Common = require('../config/common');
const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var models = require('../models/index');
var dateFormat = require('dateformat');
module.exports = function(app){
    Pessoa = app.serverSide.models.index.Pessoa;

    var pessoaController = {
        novoCadastroPessoa: function(req,res,next){
            Pessoa
                .create({
                    CPF: req.body.infoPessoa.cpf,
                    Nome: req.body.infoPessoa.nome,
                    Sobrenome: req.body.infoPessoa.sobrenome,
                    Identidade: req.body.infoPessoa.identidade,
                    DataNascimento: '1994-11-09',
                    Rua: req.body.infoPessoa.rua,
                    Numero: req.body.infoPessoa.numero,
                    Bairro: req.body.infoPessoa.bairro,
                    Apartamento: req.body.infoPessoa.apartamento,
                    Cep: req.body.infoPessoa.cep,
                    Cidade: req.body.infoPessoa.cidade,
                    Email: req.body.infoPessoa.email
                }).then(function(result){
                res.sendStatus(200);
            }).catch(function (err) {
                console.log(err)
            })
        }
    };
    return pessoaController;
};