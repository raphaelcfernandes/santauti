/**
 * Created by raphael on 3/16/17.
 */
module.exports = function(app){
    pessoa = app.serverSide.controllers.pessoa;
    app.post('/inserirPessoa', pessoa.novoCadastroPessoa);
    app.get('/getPessoa',pessoa.buscaCadastroPessoa);
    app.put('/updatePessoa',pessoa.updateCadastroPessoa);
}
