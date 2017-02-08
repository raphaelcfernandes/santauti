/**
 * Created by raphael on 1/9/17.
 */
/****************************************************/
const Common = require('../config/common');
const Config = require('../config/generalConfig');
const Jwt = require('jsonwebtoken');
const privateKey = Config.key.privateKey;
/****************************************************/
var debug = require('debug');
var express = require('express');
var router = express.Router();

var path = require('path');
var loginDAO = require('../DAO/loginDAO');
var models = require('../models/index');
var https = require('https');

router.get('/', function(req, res){
 res.status(200);
 //res.set( { 'content-type': 'text/html; charset=utf-8' } );
 //res.sendFile(path.join(__dirname, '../../client-side/views', 'index.html'));
 res.render('index');
 });

router.post('/login', function(req, res) {
    console.log(req.body.passw);
    models.Profissional.findOne({
        where:{
            Usuario: req.body.user
        }
    }).then(function(result) {
        if(req.body.passw === Common.decrypt(result.Senha)){
            var tokenData = {
                username: result.Usuario,
                id: result.Registro
            };
            var result = {
                tipoProfissional: result.TipoProfissional,
                token: Jwt.sign(tokenData, privateKey)
            };
            return res.json(result);
        }
        else
            return res.statusCode=400;
    });
});
module.exports = router;