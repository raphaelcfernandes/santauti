var app = angular.module('SantaUTIApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});