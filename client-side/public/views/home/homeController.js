/**
 * Created by raphael on 2/13/17.
 */

app.controller('homeCtrl', function($scope,$state,$rootScope,$timeout,$mdDialog) {
    /**
     * NIVELPROFISSIONAL = 1 -> ADMIN
     * NIVELPROFISSIONAL = 2 -> MEDICO
     */

    /*****************************VARIABLES && $SCOPE DECLARATION*********************/
    $scope.nomeUtilizador = '';
    $scope.pessoas = [];
    $scope.nivelProfissional = parseInt(sessionStorage.tipoProfissional);

    //Separar profissional de paciente.

    //OS BOTÕES DE CONFIRMAÇÃO
    $scope.status = '  ';
    $scope.customFullscreen = false;

    /* $scope.showAlert = function(ev) {
     // Appending dialog to document.body to cover sidenav in docs app
     // Modal dialogs should fully cover application
     // to prevent interaction outside of dialog
     $mdDialog.show(
     $mdDialog.alert()
     //.parent(angular.element(document.querySelector('#popupContainer')))
     .clickOutsideToClose(true)
     .title('This is an alert title')
     .textContent('You can specify some description text in here.')
     .ariaLabel('Alert Dialog Demo')
     .ok('Got it!')
     .targetEvent(ev)
     );
     };*/

    /*$scope.showConfirm = function(ev) {
     // Appending dialog to document.body to cover sidenav in docs app
     var confirm = $mdDialog.confirm()
     .title('Would you like to delete your debt?')
     .textContent('All of the banks have agreed to forgive you your debts.')
     .ariaLabel('Lucky day')
     .targetEvent(ev)
     .ok('Please do it!')
     .cancel('Sounds like a scam');

     $mdDialog.show(confirm).then(function() {
     $scope.status = 'You decided to get rid of your debt.';
     }, function() {
     $scope.status = 'You decided to keep your debt.';
     });
     };*/
    //FIM BOTÕES CONFIRMAÇÃO

    $scope.nivelProfissional == 1 ? $scope.nomeUtilizador = 'Profissionais' : $scope.nomeUtilizador = 'Pacientes';
    /*****************************VARIABLES && $SCOPE DECLARATION*********************/
    /*

     */
    $scope.getProfissional = function () {
        $rootScope.reqWithToken('/homeGETProfissionais', sessionStorage.getItem("token"), 'GET', function (success) {
            for (var i = 0; i < success.length; i++) {
                $scope.pessoas.push({
                    name: success[i].Nome,
                    sobrenome: success[i].Sobrenome,
                    id: success[i].ID,
                    Ativo: success[i].Ativo,
                    qrkey: success[i].QRKey
                });
            }
            console.log($scope.pessoas);
        }, function (err) {
            console.log(err);
        });
    }

    $scope.gerarQrCode = function (ev, id, qrval) {
        var data = {
            id: id
        }
        //Reativar if e else no caso da janela de confirmação passar a funcionar
        if (qrval == null) {
            $rootScope.reqWithToken('/gerarQr', data, 'POST', function (success) {
                //console.log(success);
                //Atualiza o array #pessoa
                for (var i = 0; i < $scope.pessoas.length; i++) {
                    if ($scope.pessoas[i].id == success.ID) {
                        $scope.pessoas[i].qrkey = success.QRKey;
                    }
                }
            }, function (err) {
                console.log("Erro de roteamento");
            });
        }
        else {
            // Criando a janela de confirmação
            var confirm = $mdDialog.confirm()
                .title('Gerar novo QR-CODE?')
                .textContent('Você deseja realmente gerar um novo qr-code para esta pessoa? Com essa ação, todos os qr-code gerados anteriormente serão invalidados!')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Gerar novo')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function () {
                $scope.status = 'You decided to get rid of your debt.';
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        }
    };


    if ($scope.nivelProfissional == 1) {
        $scope.getProfissional();

    }

    $scope.adicionarNovo = function () {
        sessionStorage.setItem("acao", "novo");
        if ($scope.nivelProfissional == 1) {//Redireciona para pagina de cadastro de PROFISSIONAL
            $state.go("pessoa", {
                acao: "novo"
            });
        }

    }


    $scope.desativarProfissional = function (id) {
        var data = {id: id};
        $rootScope.reqWithToken('/desativarProfissional', data, 'PUT', function (success) {
            console.log(success);
        }, function (err) {
            console.log(err);
        });
    };

    $scope.editar = function (id) {
        sessionStorage.setItem("ID", id);
        sessionStorage.setItem("acao", "editar");
        $state.go("pessoa", {
            acao: "editar",
            id: id
        });
    };
});



