/**
 * Created by raphael on 3/17/17.
 */
module.exports = function(app){
    profissional = app.serverSide.controllers.profissional;
    app.post('/inserirProfissional', profissional.novoCadastroProfissional);
}
