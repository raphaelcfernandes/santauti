/**
 * Created by raphael on 1/11/17.
 */

module.exports = function(app){
    var user = app.controllers.usersController;
    var auth = app.controllers.auth;

    app.get('/api/users', user.getById);
    app.post('/api/users', user.new);
    app.put('/api/users', user.update);
    app.delete('/api/users', user.delete);

    app.get('/api/users/list', user.list);

    app.post('/api/users/login', user.userLogin);

    app.get('/api/users/me', auth.userAuth, user.me)
}
