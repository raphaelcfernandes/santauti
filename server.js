/*************VARIABLES DECLARATION**********/
var passport = require('passport');
var express = require("express");
var bodyParser = require("body-parser");
var models = require("./server-side/models");
var app = express();
//var http = require('http').Server(app);
var fs = require('fs');
var https = require('https');
var options = {
    key: fs.readFileSync('server-side/certs/server.key'),
    cert: fs.readFileSync('server-side/certs/server.crt')
    //ca: fs.readFileSync('ca-crt.pem')
};
/*************END OF DECLARATION************/

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname ));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(require('./server-side/routes'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, UPDATE, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
/*********************************************/

models.sequelize.sync().then(function () {
    var server = https.createServer(options, app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });
});
module.exports = app;
