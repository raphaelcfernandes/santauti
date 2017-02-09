/**
 * Created by raphael on 2/9/17.
 */

var app = angular.module('SantaUTIApp', []);
app.controller('loginCtrl', function($scope, $rootScope, $location, $window, $http) {

    console.log('Logando');

    $scope.login = function(){
        console.log("user: "+$scope.user);
        console.log("senha: "+$scope.password);

        $rootScope.req('user/login', $scope.user, 'POST', function(success){
            console.log(success);


        }, function(error){
            console.log(error);

        });


    };
});