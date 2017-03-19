/**
 * Created by raphael on 3/19/17.
 */
module.exports = function(app){
    var auth = app.serverSide.controllers.authentication;
    app.post('/verifyToken', auth.verifyToken);
}