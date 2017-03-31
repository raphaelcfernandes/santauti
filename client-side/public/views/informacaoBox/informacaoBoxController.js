/**
 * Created by raphael on 3/28/17.
 */
app.controller('informacaoBoxCtrl',function ($scope,$stateParams,$rootScope) {
    if($rootScope.cache===undefined) {
        // $rootScope.reqWithToken('/getDadosPaciente?idPaciente=' + sessionStorage.getItem("ID"), '', 'GET', function (success) {
        //     $rootScope.cache = success;
        // }, function (err) {
        //     console.log(err);
        // });
    }
});