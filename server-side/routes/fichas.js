/**
 * Created by raphael on 3/31/17.
 */
module.exports = function(app){
    var fichas = app.serverSide.controllers.fichas;
    app.get('/getFichasEvolucaoPorIdPaciente',fichas.getFichasEvolucaoPorIdPaciente);
    app.get('/getPendenciasPorIdPaciente',fichas.getPendenciasPorIdPaciente);
    app.post('/sendFichaFromAppToServer',fichas.sendFichaFromAppToServer);
};