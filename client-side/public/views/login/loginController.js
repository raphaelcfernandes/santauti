/**
 * Created by raphael on 2/9/17.
 */

app.controller('loginCtrl', function($scope,  $state, $window, $location, $timeout,$sessionStorage,$rootScope,$mdDialog) {
    $scope.showGreeting = false;
    sessionStorage.clear();
    $scope.showInvalidUserPasswordMessage = function(flag) {
            flag == true ? $scope.msg = "Usuario e/ou Senha inválidos." : $scope.msg = "Campos não podem ser vazios.";
            $scope.showGreeting = true;
            $timeout(function () {
                $scope.showGreeting = false;
            }, 5000);
    };



    $scope.login = function() {
        if ($scope.user != undefined && $scope.password != undefined){
            var data = {
                user: $scope.user,
                passw: $scope.password
            };
            $rootScope.req('/login', data, 'POST', function (success) {
                sessionStorage.setItem("token", success.token);
                sessionStorage.setItem("tipoProfissional", success.tipoProfissional);
                $state.go('home');
            }, function (err) {
                console.log(err);
                $scope.showInvalidUserPasswordMessage(true);
            });
        }
        else
            $scope.showInvalidUserPasswordMessage(false);
    };
    /*
     Abrir janela para login com qr code
     */
    $scope.openQrl = function(ev){
        var opQR = $mdDialog.show({
            templateUrl: '../modals/qrlogin/qrLogin.html',
            controller: 'qrLoginCtrl',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
        })

    }


});
