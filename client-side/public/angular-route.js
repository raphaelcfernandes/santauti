var app = angular.module('SantaUTIApp', ['ui.router']);

app.config(function($stateProvider, $locationProvider, $urlRouterProvider){

    /*$stateProvider
        .state('login',{
            url:'/',
            templateUrl: 'views/index.html',
            controller: 'loginCtrl',
        })
        .state('home',{
            url: '/home',
            controller: 'homeCtrl',
            templateUrl: 'views/home/home.html'
        });*/
    $routeProvider
        .when('/home' , {templateUrl: 'views/home/home.html',  controller: homeCtrl})
        .otherwise({redirectTo: '/login'});
    $locationProvider.html5Mode(true);
});