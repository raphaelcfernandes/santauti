/**
 * Created by raphael on 3/28/17.
 */
app.controller('informacaoBoxCtrl',function ($scope,$stateParams,$rootScope) {
    $scope.dados={};
    $rootScope.reqWithToken('/getDadosPaciente?idPaciente='+sessionStorage.getItem("ID"),'', 'GET', function (success) {
        $scope.dados=success;
        console.log($scope.dados);
    }, function (err) {
        console.log(err);
    });
});