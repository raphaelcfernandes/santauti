/**
 * Created by raphael on 4/10/17.
 */
module.exports = function(app){
    var evolucao = app.serverSide.controllers.evolucao;
    app.get('/getAllEvolucaoByIdPacientePorInternacaoMaisRecente',evolucao.getAllEvolucaoByIdPacientePorInternacaoMaisRecente);
};