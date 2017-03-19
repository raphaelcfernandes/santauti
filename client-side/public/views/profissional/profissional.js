/**
 * Created by raphael on 3/17/17.
 */

app.controller('usuarioCtrl', function($scope,  $state,$rootScope) {
    /***************************VAR && SCOPE DECLARATIONS********************/
    $scope.tipoProfissional= {
        model: tipoProfissional,
        options: [
            {value: 1, name: '1 - Administrador'},
            {value: 2, name: '2 - Medico'}]
    };
    $scope.cadastro={};
    /***************************VAR && SCOPE DECLARATIONS********************/


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
            if(err === 'Unauthorized'){
                alert("Voce nao tem permissao para efetuar essa aćao");
            }
            else if(err === 'Registro') {
                /*
                 ESSA MENSAGEM DE ERRO DEVE APARECER COMO BALAO EMBAIXO DO INPUT DE CPF
                 O INPUT DEVE FICAR COM AS BORDAS VERMELHAS
                 */
                alert("Registro já existe no sistema");//
            }
            else{
                alert("ERRO ESTRANHO, CONTATE A EQUIPE DE DESENVOLVIMENTO");
            }
        });
    };

    $scope.escolherProfissional = function(){
        $scope.cadastro.tipoProfissional=parseInt($scope.profissional);
    };
});