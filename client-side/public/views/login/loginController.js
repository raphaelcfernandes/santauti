/**
 * Created by raphael on 2/9/17.
 */

/*var app = angular.module('SantaUTIApp', []);*/
app.controller('loginCtrl', function($scope,  $state, $window, $location, $timeout) {


    $scope.showGreeting = false;
    var link = "https://" + $window.location.host + "/home";
    $scope.showInvalidUserPasswordMessage = function() {
        $scope.msg="Usuario e/ou Senha inválidos.";
        $scope.showGreeting = true;
        $timeout(function(){
            $scope.showGreeting = false;
        }, 10000);
    };

    $scope.login = function(){
        console.log($window.location.host);
        if($scope.user === '1' && $scope.password === '2')
            $state.go('home');
        else
            $scope.showInvalidUserPasswordMessage();
    };

});
