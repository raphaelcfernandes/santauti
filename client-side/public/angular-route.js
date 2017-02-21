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
        .state('fichaDiaria',{
            url: '/fichaDiurna',
            views:{
                '':{
                    templateUrl: 'views/ficha/diurna/diurno.html'
                },
                'header':{
                    templateUrl: 'views/ficha/navbarFicha.html'
                }
            }
        })
        .state('listaDeProblemas',{
            url: '/listaDeProblemas',
            views:{
                '':{
                    templateUrl: 'views/ficha/listaDeProblemas/listaDeProblemas.html'
                },
                'header':{
                    templateUrl: 'views/ficha/navbarFicha.html'
                }
            }
        })
        .state('neurologico',{
            url: '/neurologico',
            views:{
                '':{
                    templateUrl: 'views/ficha/neurologico/neurologico.html'
                },
                'header':{
                    templateUrl: 'views/ficha/navbarFicha.html'
                }
            }
        })
//    $locationProvider.html5Mode(true);
}]);
