/*************VARIABLES DECLARATION**********/
var passport = require('passport');
var express = require("express");
var bodyParser = require("body-parser");
var models = require("./models");
var app = express();
var http = require('http').Server(app);
/*************END OF DECLARATION************/

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname ));
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(require('./routes'));


/*********************************************/

models.sequelize.sync().then(function () {
    var server = http.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });
});
module.exports = app;
