angular.module('index', []).controller('indexCtrl',['$scope','$location', function($scope,$location) {
    $scope.submit = function() {
        //Enviar requisicao para o node
        //Node verifica usuario e senha
        //Returna true se usuario e senha correto
        //Falso otherwise
        //Redireciona pagina para -> cockpit.html
    };
}]);
