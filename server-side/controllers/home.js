/**
 * Created by raphael on 3/15/17.
 */

// const Common = require('../config/common');
// const Config = require('../config/generalConfig');
// const Jwt = require('jsonwebtoken');
// const privateKey = Config.key.privateKey;
// var models = require('../models/index');
// module.exports = function(app){
//     Profissional = app.serverSide.models.index.Profissional;
//
//     var homeController = {
//         getProfissionais: function(req,res,next) {
//             models.Profissional.findAll({
//                 include : [
//                     {
//                         model: models.Pessoa,
//                         required: true,
//                         //where: {ID: models.Sequelize.col('Profissional.ID')}
//                     }
//                 ]
//             }).then(function (result) {
//                 console.log(result);
//             });
//         }
//     }
//     return homeController;
// }



const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
var models = require('../models/index');

module.exports = function(app){
    Profissional = app.serverSide.models.index.Profissional;

    var homeController = {
        getProfissionais: function(req,res,next){
            models.sequelize.query("SELECT * FROM Profissional AS PF INNER JOIN Pessoa AS PE ON PF.ID=PE.ID;", { type: models.sequelize.QueryTypes.SELECT})
                .then(function (results) {
                    res.json(results);
                });
        }
    }
    return homeController;
}