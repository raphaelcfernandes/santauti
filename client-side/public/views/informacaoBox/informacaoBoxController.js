/**
 * Created by raphael on 3/28/17.
 */
app.controller('informacaoBoxCtrl',function ($scope,$stateParams,$rootScope,$timeout) {
    if($rootScope.cache===undefined) {
        $rootScope.reqWithToken('/getDadosPacienteByIdPacienteAndByUltimaInternacao?idPaciente=' + sessionStorage.getItem("ID"), '', 'GET', function (success) {
            $rootScope.cache = success;
            $rootScope.cache.paciente.Internacaos[0].DataInternacao = moment($rootScope.cache.paciente.Internacaos[0].DataInternacao,'YYYY-MM-DD H:m:s').format("LLL");
        }, function (err) {
            console.log(err);
        });
    }
});