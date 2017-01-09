var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./DatabaseSQLDirectory/databaseConnection");
/*--------------------------------------------*/

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/view'));

app.get('/',function (req,res){
    res.sendFile('index.html');
});

/*********************************************/
var server = app.listen(3000, function(){
    console.log("Server running on port: "+server.address().port);
});