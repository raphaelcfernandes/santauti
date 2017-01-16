var passport = require('passport');
var load = require('express-load');
var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./public/DatabaseSQLDirectory/databaseConnection");
/*--------------------------------------------*/

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

load("controllers")
    .then("routes")
    .into(app);
/*********************************************/
var server = app.listen(3000, function(){
    console.log("Server running on port: "+server.address().port);
});
connection.init();
connection.acquire();