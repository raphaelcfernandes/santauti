/**
 * Created by raphael on 3/17/17.
 */
module.exports = function(app){
    profissional = app.serverSide.controllers.profissional;
    app.post('/inserirProfissional', profissional.novoCadastroProfissional);
    app.post('/gerarQr',profissional.gerarQr);
    app.put('/desativarProfissional',profissional.desativarProfissional);
    app.put('/reativarProfissional',profissional.reativarProfissional);
    app.get('/getDadosProfissional',profissional.getDadosProfissional);
    app.put('/atualizarProfissional',profissional.atualizarCadastro);

}
