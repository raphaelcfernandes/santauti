
/*************VARIABLES DECLARATION**********/
var express = require("express");
var bodyParser = require("body-parser");
var load = require('express-load');
var path = require('path');
var models = require("./server-side/models/index");
var app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser');
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


app.use(express.static(path.join(__dirname, 'client-side/public')));
app.use(cors());
app.set('views', __dirname + '/client-side/public/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client-side/public/views')));

load("./server-side/models/index")
    .then("./server-side/controllers")
    .then("./server-side/routes")
    .into(app);


app.get('*', function(req, res) {
    res.render('index.html');
});


/*********************************************/

models.sequelize.sync().then(function () {
    var server = https.createServer(options, app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });
});

module.exports = app;
