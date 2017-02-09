/**
 * Created by raphael on 2/9/17.
 */
var app = angular.module('SantaUTIApp', []);
app.controller('loginCtrl', function($scope, $rootScope, $location, $window, $http, $timeout) {


    $scope.showGreeting = false;

    $scope.showInvalidUserPasswordMessage = function() {
        $scope.msg="Usuario e/ou Senha inválidos.";
        $scope.showGreeting = true;
        $timeout(function(){
            $scope.showGreeting = false;
        }, 10000);
    };

    $scope.login = function(){
        console.log("user: "+$scope.user);
        console.log("senha: "+$scope.password);
        if($scope.user === '1' && $scope.password === '2')
            $window.location.href='/about.html';
        else
            $scope.showInvalidUserPasswordMessage();
    };

});
