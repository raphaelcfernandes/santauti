/**
 * Created by raphael on 3/31/17.
 */
module.exports = function(app){
    var fichas = app.serverSide.controllers.fichas;
    app.get('/getFichasEvolucaoPorIdPaciente',fichas.getFichasEvolucaoPorIdPaciente);
};