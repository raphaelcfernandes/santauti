/**
 * Created by raphael on 3/19/17.
 */
const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;

module.exports = function(app){
    var authenticationController = {
        verifyToken: function(req,res,next) {
            try {
                Jwt.verify(req.body.token, privateKey);
                res.sendStatus(200);
            } catch(err) {
                res.sendStatus(401);
            }
         }
    };
    return authenticationController;
};