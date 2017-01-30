/**
 * Created by raphael on 1/9/17.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var loginDAO = require('../DAO/loginDAO');
var models = require('../models');

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.post('/login', function(req, res) {
    models.Profissional.findOne({
        where:{
            Usuario: req.body.user,
            Senha: req.body.passw
        }
    }).then(function(task) {
        if(task) {
            console.log("\nServer encontrou um registro\n");
            return res.json(200);
        }
        else{
            console.log("\nServer nao encontrou nada");
        }
    });
});
module.exports = router;