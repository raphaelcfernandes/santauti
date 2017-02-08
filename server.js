
/*************VARIABLES DECLARATION**********/
var passport = require('passport');
var express = require("express");
var bodyParser = require("body-parser");
var load = require('express-load');
var path = require('path');
var models = require("./server-side/models");
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



app.set('views', __dirname + '/client-side/views');
app.set('view engine', 'pug');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client-side/views')));
app.use(require('./server-side/routes'));


load("./server-side/controllers").into(app);


//app.use('/',routes);


app.get('/', function(req, res) {
    res.renderFile('index.html');
});

/*app.get('/', function (req, res) {
    res.render('index', { title: 'teste', message: 'Hello there!' })
})*/



/*********************************************/

models.sequelize.sync().then(function () {
    var server = https.createServer(options, app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });
});
module.exports = app;
