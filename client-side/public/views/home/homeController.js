/**
 * Created by raphael on 2/13/17.
 */

app.controller('homeCtrl', function($scope,$state,$rootScope,$timeout) {
    /**
     * NIVELPROFISSIONAL = 1 -> ADMIN
     * NIVELPROFISSIONAL = 2 -> MEDICO
     */
    $scope.nivelProfissional = parseInt(sessionStorage.tipoProfissional);
    $scope.nomeUtilizador='';
    $scope.pessoas = [];
    //Separar profissional de paciente.

    $timeout(function(){
        $scope.nivelProfissional == 1 ? $scope.nomeUtilizador='Profissionais' : $scope.nomeUtilizador='Pacientes';
    },5);

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
});
