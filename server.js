var passport = require('passport');
var http = require('http');
var load = require('express-load');
var express = require("express");
var bodyParser = require("body-parser");
var models = require("./models");
/*--------------------------------------------*/

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname ));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
/*
load("./controllers")
    .then("./routes")
    .into(app);
*/
app.get('/', function(req, res){
    res.sendFile('./index.html', {root : __dirname + '/views'});
});

/*********************************************/

models.sequelize.sync().then(function () {
    var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });
});
