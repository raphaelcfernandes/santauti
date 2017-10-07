/**
 * Created by raphael on 3/6/17.
 */
const Common = require('../config/common');
const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var knex = require('../dataBase/databaseConnection');

module.exports = function(app){
    var loginController = {
        login: function(req,res,next){
            if(req.body.USER === "no") {
                //qrcode LOGIN
                Profissional.findOne({
                    where: {
                        QRKey: req.body.data
                    }

                }).then(function(result){
                    if(result){

                        var tokenData = {
                            username: result.Usuario,
                            id: result.Registro
                        };
                        var result = {
                            tipoProfissional: result.TipoProfissional,
                            token: Jwt.sign(tokenData, privateKey)
                        };
                        res.json(result);
                    }
                    else{
                        res.sendStatus(400);
                    }
                });
            }
            else{
                knex('Profissional').where('Usuario',req.body.user).then(function (result) {
                    if (result) {
                        if (req.body.passw === Common.decrypt(result[0].Senha)) {
                            var tokenData = {
                                username: result.Usuario,
                                id: result.Registro
                            };
                            var result = {
                                tipoProfissional: result[0].TipoProfissional,
                                registro: result[0].Registro,
                                token: Jwt.sign(tokenData, privateKey)
                            };
                            res.json(result);
                        }
                        else {
                            res.sendStatus(400);
                        }
                    }
                    else {
                        res.sendStatus(400);
                    }
                },function (error) {
                    console.log(error);
                });
            }
        }
    };
    return loginController;
};