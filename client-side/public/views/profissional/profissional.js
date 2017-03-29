/**
 * Created by raphael on 3/17/17.
 */

app.controller('usuarioCtrl', function($scope,  $state,$rootScope,$stateParams) {
    /***************************VAR && SCOPE DECLARATIONS********************/
    $scope.TipoProfissional=['Administrador','Médico'];
    $scope.cadastro={};
    $scope.selectedItem;
    /***************************VAR && SCOPE DECLARATIONS********************/

    /**
     * Configura o body da requisicao (dados) para enviar para o servidor
     * @return {{infoUsuario: ({}|*), id}}
     */
    $scope.configuraDataDeEnvio=function(){
        if($scope.selectedItem=='Administrador')
            $scope.cadastro.TipoProfissional=1;
        else
            $scope.cadastro.TipoProfissional=2;
        var data = {
            infoUsuario: $scope.cadastro,
            id: sessionStorage.getItem("ID")
        };
        return data;
    };

    $scope.submit = function () {
        if($stateParams.acao==="editar") {
            $rootScope.reqWithToken('/atualizarProfissional',$scope.configuraDataDeEnvio(),'PUT',function(success){
                sessionStorage.removeItem("ID");
                alert("Cadastro alterado com sucesso");
                $state.go('home');
            },function(err){
                $scope.getDataErro(err);
            });
        }
        else{
            $scope.criarProfissional();
        }
    };

    $scope.criarProfissional = function(){
        $rootScope.reqWithToken('/inserirProfissional',$scope.configuraDataDeEnvio(),'POST',function(success){
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

    if($stateParams.acao==="editar"){
        var id= parseInt(sessionStorage.getItem("ID"));
        $rootScope.reqWithToken('/getDadosProfissional?idPessoa='+id,'','GET',function (success) {
            $scope.cadastro=success;
            if(success.TipoProfissional==1)
                $scope.selectedItem='Administrador';
            else
                $scope.selectedItem='Médico';
        },function (err) {
            console.log(err);
        });
    };

});