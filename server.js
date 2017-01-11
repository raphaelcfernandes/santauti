var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./public/DatabaseSQLDirectory/databaseConnection");
/*--------------------------------------------*/

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

connection.init();
connection.acquire();
/*********************************************/
var server = app.listen(3000, function(){
    console.log("Server running on port: "+server.address().port);
});
connection.init();
