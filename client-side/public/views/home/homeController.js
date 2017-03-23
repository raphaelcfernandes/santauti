/**
 * Created by raphael on 2/13/17.
 */


app.controller('homeCtrl',function($scope,$state,$rootScope,$timeout,$mdDialog,$sce,$interval) {

    /**
     * NIVELPROFISSIONAL = 1 -> ADMIN
     * NIVELPROFISSIONAL = 2 -> MEDICO
     */

    /*****************************VARIABLES && $SCOPE DECLARATION*********************/
    $scope.nomeUtilizador = '';
    $scope.pessoas = [];
    $scope.nivelProfissional = parseInt(sessionStorage.tipoProfissional);

    //Separar profissional de paciente.

    $scope.nivelProfissional == 1 ? $scope.nomeUtilizador = 'Profissionais' : $scope.nomeUtilizador = 'Pacientes';
    /*****************************VARIABLES && $SCOPE DECLARATION*********************/

    /**
     * Requisita ao server todos os profissionais ativos e nao ativos
     * Tem como retorno lista de profissionais
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

    };
    
    /*
     Função para reuso do gerador de QRCODE (usar nas duas possibilidades, QR EXISTE E QR NÃO EXISTE
     Também é responsável por gerar a imagem do QR-CODE
     */
    $scope.qrSave = function (data) {
        $rootScope.reqWithToken('/gerarQr', data, 'POST', function (success) {
            //console.log(success);
            //Atualiza o array #pessoa
            for (var i = 0; i < $scope.pessoas.length; i++) {
                if ($scope.pessoas[i].id == success.ID) {
                    $scope.pessoas[i].qrkey = success.QRKey;
                }
            }
            $scope.html = success.IMG;
            $scope.trustedHtml = $sce.trustAsHtml($scope.html);
        }, function (err) {
            console.log("Erro de roteamento");
        });
    };



    $scope.gerarQrCode = function (ev, id, qrval) {
        var data = {
            id: id
        };
        //Reativar if e else no caso da janela de confirmação passar a funcionar
        if (qrval == null) {
            $scope.qrSave(data);
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
                    $scope.qrSave(data);
                },
                function () { //Clicou o botão recusar
                    $scope.status = 'You decided to keep your debt.';
                });
        }
    };


    if ($scope.nivelProfissional == 1) {
        $scope.getProfissional();
    }

    /**
     * Direciona para pagina de Pessoa para usuario inserir dados
     */
    $scope.adicionarNovo = function () {
        sessionStorage.setItem("acao", "novo");
        if ($scope.nivelProfissional == 1) {//Redireciona para pagina de cadastro de PROFISSIONAL
            $state.go("pessoa", {
                acao: "novo"
            });
        }
    };


    /**
     * Recebe o ID do profissional como parametro.
     * Envia para o servidor esse ID. Irá setar como false o campo Ativo do Profissional
     * @param id
     * @return sucesso ou falha
     */
    $scope.desativarProfissional = function (id) {
        var data = {id: id};
        $rootScope.reqWithToken('/desativarProfissional', data, 'PUT', function (success) {
            console.log(success);
        }, function (err) {
            console.log(err);
        });
    };


    /**
     * Recebe ID do usuario como parametro e direciona para pagina de Pessoa, para editar dados
     * @param id
     */
    $scope.editar = function (id) {
        sessionStorage.setItem("ID", id);
        sessionStorage.setItem("acao", "editar");
        $state.go("pessoa", {
            acao: "editar",
            id: id
        });
    };

    /**
     * Abre modal para confirmacao de desativar profissional
     * @param id
     * @param ev
     */
    $scope.showConfirm = function(id,ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm(id)
            .title('Desativaćao de Usuário.')
            .textContent('Este usuário será desativado e não fará mais parte do sistema, sendo necessário sua reativacao posteriormente. Deseja continuar mesmo assim?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Desativar.')
            .cancel('Não.');

        $mdDialog.show(confirm).then(function() {
            $scope.desativarProfissional(id);
        });
    };
});



