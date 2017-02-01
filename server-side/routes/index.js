/**
 * Created by raphael on 1/9/17.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var loginDAO = require('../DAO/loginDAO');
var models = require('../models/index');

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../../client-side/views', 'index.html'));
});

router.post('/login', function(req, res) {
    models.Profissional.findOne({
        where:{
            Usuario: req.body.user,
            Senha: req.body.passw
        }
    }).then(function(task) {
        if(task) {
            return res.json(200);
        }
    });
});
module.exports = router;