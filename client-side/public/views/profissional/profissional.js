/**
 * Created by raphael on 3/17/17.
 */

app.controller('usuarioCtrl', function($scope,  $state,$rootScope) {
    /***************************VAR && SCOPE DECLARATIONS********************/
    $scope.TipoProfissional=['Administrador','Médico'];
    $scope.cadastro={};
    $scope.selectedItem;
    /***************************VAR && SCOPE DECLARATIONS********************/


    $scope.submit = function () {
        if(sessionStorage.getItem("acao")=="editar") {
            if($scope.selectedItem=='Administrador')
                $scope.cadastro.TipoProfissional=1;
            else
                $scope.cadastro.TipoProfissional=2;
            var data = {
                infoUsuario: $scope.cadastro,
                id: sessionStorage.getItem("ID")
            };
            $rootScope.reqWithToken('/atualizarProfissional',data,'PUT',function(success){

                // sessionStorage.removeItem("ID");
                // sessionStorage.remove("acao");
                alert("Cadastro alterado com sucesso");
                // $state.go('home');
            },function(err){
                $scope.getDataErro(err);
            });
        }
        else{
            $scope.criarProfissional();
        }
    };

    $scope.criarProfissional = function(){
        var data = {
            infoUsuario: $scope.cadastro,
            idPessoa: sessionStorage.getItem("ID")
        };
        $rootScope.reqWithToken('/inserirProfissional',data,'POST',function(success){
            sessionStorage.removeItem("ID");
            alert("Cadastro inserido com sucesso");
            $state.go('home');
        },function(err){
            $scope.getDataErro(err);
        });
    };

    $scope.getDataErro = function(err){
        if (err === 'Unauthorized') {
            alert("Voce nao tem permissao para efetuar essa aćao");
        }
        console.log(err);
    };

    if(sessionStorage.getItem("acao")=="editar"){
        var id= parseInt(sessionStorage.getItem("ID"));
        $rootScope.reqWithToken('/getDadosProfissional?idPessoa='+id,'','GET',function (success) {
            $scope.cadastro=success;
            if(success.TipoProfissional==1)
                $scope.selectedItem='Administrador';
            else
                $scope.selectedItem='Médico';
            console.log($scope.cadastro);
        },function (err) {
            console.log(err);
        });
    }
});