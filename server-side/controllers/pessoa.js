/**
 * Created by raphael on 3/16/17.
 */

const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
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
            try {
                Jwt.verify(req.body.token, privateKey);
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
                    }).then(function(){
                    Pessoa.findOne({
                        where:{
                            CPF: req.body.infoPessoa.cpf
                        }
                    }).then(function(result){
                        res.json({ID:result.ID});
                        res.sendStatus(201);
                    });
                }).catch(models.Sequelize.UniqueConstraintError,function (err) {
                    res.status(400).end(objToString(err.fields));
                })
            } catch(err) {
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