/**
 * Created by raphael on 2/13/17.
 */

app.controller('homeCtrl', function($scope,$state,$rootScope,$timeout) {
    /**
     * NIVELPROFISSIONAL = 1 -> ADMIN
     * NIVELPROFISSIONAL = 2 -> MEDICO
     */
    $scope.nomeUtilizador='';
    $scope.pessoas = [];
    $scope.nivelProfissional = parseInt(sessionStorage.tipoProfissional);

    //Separar profissional de paciente.


    $scope.nivelProfissional == 1 ? $scope.nomeUtilizador='Profissionais' : $scope.nomeUtilizador='Pacientes';


    $scope.visualizar = function(age){
        $state.go("visualizarPaciente",{
            id: age
        });
    };

    if($scope.nivelProfissional==1) {
        $rootScope.req('/homeGETProfissionais', sessionStorage.getItem("token"), 'GET', function (success) {
            for (var i = 0; i < success.length; i++) {
                $scope.pessoas.push({name: success[i].Nome + ' ' + success[i].Sobrenome});
            }
        }, function (err) {
            console.log("que pau cabuloso mano");
        });
    }

    $scope.adicionarNovo = function(){
        if($scope.nivelProfissional==1){//Redireciona para pagina de cadastro de PROFISSIONAL
            $state.go("usuario",{
                acao: "novo"
            });
        }
    }
});
