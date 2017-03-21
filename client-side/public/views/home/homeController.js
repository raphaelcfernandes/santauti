/**
 * Created by raphael on 2/13/17.
 */

app.controller('homeCtrl', function($scope,$state,$rootScope,$timeout,$mdDialog) {
    /**
     * NIVELPROFISSIONAL = 1 -> ADMIN
     * NIVELPROFISSIONAL = 2 -> MEDICO
     */

    /*****************************VARIABLES && $SCOPE DECLARATION*********************/
    $scope.nomeUtilizador='';
    $scope.pessoas = [];
    $scope.nivelProfissional = parseInt(sessionStorage.tipoProfissional);

    //Separar profissional de paciente.


    $scope.nivelProfissional == 1 ? $scope.nomeUtilizador='Profissionais' : $scope.nomeUtilizador='Pacientes';
    /*****************************VARIABLES && $SCOPE DECLARATION*********************/


    $scope.gerarQrCode = function (id) {
        var data={
            id:id
        };
        $rootScope.reqWithToken('/gerarQRCodeProfissional',data,'POST',function (success) {
            console.log(success);
        },function (err) {

        })
    };

    if($scope.nivelProfissional==1) {
        $rootScope.reqWithToken('/homeGETProfissionais', sessionStorage.getItem("token"), 'GET', function (success) {
            for (var i = 0; i < success.length; i++)
                $scope.pessoas.push({name: success[i].Nome,sobrenome: success[i].Sobrenome,id:success[i].ID, Ativo:success[i].Ativo});
        }, function (err) {
            console.log(err);
        });
    }

    $scope.adicionarNovo = function(){
        sessionStorage.setItem("acao","novo");
        if($scope.nivelProfissional==1){//Redireciona para pagina de cadastro de PROFISSIONAL
            $state.go("pessoa",{
                acao: "novo"
            });
        }
    };

    $scope.desativarProfissional = function (id) {
        var data = {id: id};
        $rootScope.reqWithToken('/desativarProfissional',data,'PUT',function (success) {
            console.log(success);
        },function (err) {
            console.log(err);
        });
    };

    $scope.editar = function (id) {
        sessionStorage.setItem("ID",id);
        sessionStorage.setItem("acao","editar");
        $state.go("pessoa",{
            acao: "editar",
            id: id
        });
    };
    $scope.status = '  ';
    $scope.customFullscreen = false;

    $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Desativaćao de Usuário.')
            .textContent('Este usuário será desativado e não fará mais parte do sistema, sendo necessário sua reativacao posteriormente. Deseja continuar mesmo assim?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Desativar.')
            .cancel('Não.');

        $mdDialog.show(confirm).then(function() {

        }, function() {
            $scope.status = 'You decided to keep your debt.';
        });
    };
});
