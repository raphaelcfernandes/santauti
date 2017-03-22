/**
 * Created by raphael on 2/9/17.
 */

app.controller('loginCtrl', function($scope,  $state, $window, $location, $timeout,$sessionStorage,$rootScope) {

    $scope.showGreeting = false;
    $scope.showInvalidUserPasswordMessage = function(flag,qr,err) {
        if(qr == 0) {
            flag == true ? $scope.msg = "Usuario e/ou Senha inválidos." : $scope.msg = "Campos não podem ser vazios.";
            $scope.showGreeting = true;
            $timeout(function () {
                $scope.showGreeting = false;
            }, 5000);
        }
        else{
            if(flag){
                $scope.msg = "QR-Code Inválido!";
            }
            //flag == true ? $scope.msg = "Qr-code Inválido!" : $scope.msg = "Campos não podem ser vazios.";
            $scope.showGreeting = true;
            $timeout(function () {
                $scope.showGreeting = false;
            }, 5000);
            if(flag == false){
                $scope.msg = err;
                $scope.showGreeting = true;
                $timeout(function () {
                    $scope.showGreeting = false;
                }, 5000);
            }
        }
    };

    $scope.onSuccess = function(data) {
        if (data) {
            var datas = {
                user: "no",
                data: data
            };
            $rootScope.req('/login', datas, 'POST', function (success) {
                sessionStorage.setItem("token", success.token);
                sessionStorage.setItem("tipoProfissional", success.tipoProfissional);
                $state.go('home');
            }, function (err) {
                $scope.showInvalidUserPasswordMessage(true, 1);
            });
        }
        ;
    }

    $scope.onError = function(error) {
        $scope.showInvalidUserPasswordMessage(false,1,error);
    };
    $scope.onVideoError = function(error) {
        $scope.showInvalidUserPasswordMessage(false,1,error);
    };

    $scope.onSuccess = function(data) {
        if(data) {
            var datas = {
                USER: "no",
                data: data
            };
            $rootScope.req('/login', datas, 'POST', function (success) {
                sessionStorage.setItem("token", success.token);
                sessionStorage.setItem("tipoProfissional", success.tipoProfissional);
                $state.go('home');
            }, function (err) {
                $scope.showInvalidUserPasswordMessage(true);
            });
        }
        else console.log("Ops");
    };
    $scope.onError = function(error) {
        console.log(error);
    };
    $scope.onVideoError = function(error) {
        console.log(error);
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
                $scope.showInvalidUserPasswordMessage(true,0,null);
            });
        }
        else
            $scope.showInvalidUserPasswordMessage(false,0,null);
    };

});
