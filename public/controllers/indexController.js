angular.module('app.index',['ui.router']).controller('indexCtrl',['$scope','$location','$stateParams', function($scope,$location,$stateParams) {
    $scope.submit = function() {
        console.log($scope.uname);

        //Enviar requisicao para o node
        //Node verifica usuario e senha
        //Returna true se usuario e senha correto
        //Falso otherwise
        //Redireciona pagina para -> cockpit.html
    };
}]);
