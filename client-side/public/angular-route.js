var app = angular.module('SantaUTIApp', ['ui.router']);

/**
 * Configure the Routes
 */
app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            views:{
                '':{
                    templateUrl: 'views/login/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('home',{
            url: '/home',
            views:{
                '':{
                    templateUrl: 'views/home/home.html',
                    controller: 'homeCtrl'
                }
            }
        });
}]);
