/**
 * Created by raphael on 1/9/17.
 */
module.exports = function(app){
    login = app.serverSide.controllers.login;
    app.post('/login', login.login);
};
