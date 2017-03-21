/**
 * Created by raphael on 3/17/17.
 */
const Common = require('../config/common');
const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var models = require('../models/index');


module.exports = function(app){
    Profissional = app.serverSide.models.index.Profissional;

    var profissionalController = {
        /**
         * RECEBE TOKEN E DATA DENTRO DE REQ.BODY.INFOUSUARIO
         * VERIFICA SE TOKEN É ORIGINAL, CASO SEJA, TENTA INSERIR NO BANCO
         * SE SUCESSO RETORNA NOVO ID INSERIDO. CASO FALHE, RETORNA MSG DE ERRO DE ACORDO COM O ERRO
         * @param req
         * @param res
         * @param next
         */
        novoCadastroProfissional: function(req,res,next){
            try {
                Jwt.verify(req.headers.access_token, privateKey);
                Profissional
                    .create({
                        Registro: req.body.infoUsuario.registro,
                        ID: req.body.idPessoa,
                        Usuario: req.body.infoUsuario.usuario,
                        Senha: Common.encrypt(req.body.infoUsuario.senha),
                        TipoProfissional: req.body.infoUsuario.tipoProfissional,
                        Ativo: true
                    }).then(function(){
                        res.sendStatus(201);
                    }
                ).catch(models.Sequelize.UniqueConstraintError,function (err) {
                    res.status(400).end(objToString(err.fields));
                })
            } catch(err) {
                res.sendStatus(401);
            }
        },

        /*
         Função que gera o qrcode
         */
        gerarQr : function(req,res,next) {
            try {
                Jwt.verify(req.headers.access_token, privateKey);
                Profissional.findOne({
                    where: {
                        ID: req.body.id
                    }
                }).then(function (result) {
                    if (result) {
                        console.log(result.Usuario);
                        var salt = Common.randomB(8);
                        var password = salt + "" + result.Usuario.toString() + "" + result.Senha.toString();
                        var encrp = (Common.encrypt(password));
                        result.updateAttributes({
                            QRKey: encrp
                        });
                        res.json({
                            ID: req.body.id,
                            QRKey: encrp
                        });
                        //Tentar enviar o status ainda, CORRIGIR ISSo
                        console.log("modificado com sucesso");
                    }//Realiza as consultas e adiciona o código do qr-code, além de gerá-lo

                }).catch(models.Sequelize.UniqueConstraintError, function (err) {
                    res.status(400).end(objToString(err.fields));
                });//Captura o erro na consulta SQL
            } catch (err) {
                res.sendSatus(401); // Captura erro de token
            }
        },

        desativarProfissional: function(req,res,next){
            try {
                Jwt.verify(req.headers.access_token, privateKey);
                Profissional.findOne({
                    where: { ID: req.body.id}
                }).then(function (result) {
                    if (result) {
                        result.updateAttributes({
                            Ativo: false
                        });
                        res.sendStatus(201);
                    }
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
    return profissionalController;

};