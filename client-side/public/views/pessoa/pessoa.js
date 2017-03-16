/**
 * Created by raphael on 3/16/17.
 */
app.controller('pessoaCtrl', function($scope,  $state,$rootScope) {
    $scope.dados={};
    $scope.criarUsuario = function () {
        var data ={
            infoPessoa: $scope.dados,
            token: sessionStorage.getItem("token")
        };
        $rootScope.req('/inserirPessoa',data,'POST',function(success){
            console.log(success);
            $state.go('home');
        },function(err){
            console.log("deu ruim nego");
        });
    }
})