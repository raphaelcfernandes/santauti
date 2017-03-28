/**
 * Created by raphael on 3/28/17.
 */
module.exports = function(app){
    var paciente = app.serverSide.controllers.paciente;
    app.get('/getPacientes', paciente.getPacientes);
    app.get('/getDadosPaciente',paciente.getDadosPaciente);
};
