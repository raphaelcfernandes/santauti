/**
 * Created by raphael on 2/21/17.
 */
app.controller('navbarCtrl', function($scope,$state,$location,$rootScope) {

    $scope.currentNavItem = "diaria";


    if($rootScope.determinatedValue === undefined){
        $rootScope.determinatedValue = 100;
    }
    if($rootScope.quantidadeBarra === undefined){
        $rootScope.quantidadeBarra = 0;
    }
    $scope.selectedIndex=0;
    $scope.$on('$stateChangeSuccess', function(event, toState) {
        $scope.selectedIndex = toState.data.selectedTab;
    });


    $scope.button=false;
    $scope.Button = function(){
        $scope.button=true;
    };
    $scope.destroySession = function () {
        sessionStorage.clear();
    };
    $scope.enviarFicha = function () {
        console.log($rootScope.dados);
        $rootScope.reqWithToken('/salvarFichaEvolucao?idPaciente='+$rootScope.cache.paciente.ID+'&RegistroMedico='+$rootScope.cache.paciente.Responsavel,
            $rootScope.dados, 'POST', function (success) {
            console.log(success);
        }, function (err) {
            $scope.getDataErro(err);
        });
    }
});
