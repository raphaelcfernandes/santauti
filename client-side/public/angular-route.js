var app = angular.module('SantaUTIApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when('/', {
            controller: 'loginCtrl',
            templateUrl: 'views/index.html'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});