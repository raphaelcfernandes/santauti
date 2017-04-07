/**
 * Created by raphael on 4/4/17.
 */

module.exports = function(app){
    var dispositivos = app.serverSide.controllers.dispositivos;
    app.get('/getAllDispositivosByIdPaciente',dispositivos.getAllDispositivosByLastDataInternacaoAndByIdPaciente);
    app.post('/newDispositivosByIdPaciente',dispositivos.newDispositivosByIdPaciente);
    app.put('/updateDispositivosByIdDispositivoEByIdPaciente',dispositivos.updateDispositivosByIdDispositivoEByIdPaciente);
};
