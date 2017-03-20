/**
 * Created by raphael on 3/15/17.
 */
const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var models = require('../models/index');

module.exports = function(app){
    Profissional = app.serverSide.models.index.Profissional;

    var homeController = {
        getProfissionais: function(req,res,next){
            try{
                Jwt.verify(req.headers.access_token, privateKey);
                models.sequelize.query("SELECT * FROM Profissional AS PF INNER JOIN Pessoa AS PE ON PF.ID=PE.ID;", { type: models.sequelize.QueryTypes.SELECT})
                    .then(function (results) {
                        res.json(results);
                    });
            }catch(err){
                res.sendStatus(401);
            }
        }
    };
    return homeController;
}