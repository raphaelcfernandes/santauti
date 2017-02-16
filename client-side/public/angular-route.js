var app = angular.module('SantaUTIApp', ['ui.router']);

/**
 * Configure the Routes
 */
app.config(['$stateProvider','$locationProvider', function ($stateProvider,$locationProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl'
        })
        .state('home',{
            url: '/home',
            views:{
                '':{
                    templateUrl: 'views/home/home.html',
                    controller: 'homeCtrl'
                },
                'header':{
                    templateUrl: 'views/toolbar/header.html',
                    controller: 'headerCtrl'
                }
            }
        })
        .state('visualizarPaciente',{
            url: '/visualizarPaciente/:id',
            views:{
                '':{
                    templateUrl: 'views/paciente/paciente.html',
                    controller: 'pacienteCtrl'
                },
                'header':{
                    templateUrl: 'views/toolbar/header.html',
                    controller: 'headerCtrl'
                }
            }
        })
//    $locationProvider.html5Mode(true);
}]);
