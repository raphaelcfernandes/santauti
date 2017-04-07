var app = angular.module('SantaUTIApp', ['ngMaterial','ui.router','ngStorage','qrScanner','moment-picker','ngMessages']);

app.run(function ($rootScope,$location,$window,$state, $stateParams, $http) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    moment.locale('pt-br');
    $rootScope.reqApiURL = '';

    $rootScope.req = function(service, params, type, success, error) {
        $http({
            url: $rootScope.reqApiURL + service,
            method: type,
            data: params
        })
            .then(function(response) {
                success(response.data);
            },function(err){
                error(err.data);
            });

    };

    $rootScope.reqWithToken = function(service, params, type, success, error) {
        $http({
            url: $rootScope.reqApiURL + service,
            method: type,
            data: params,
            headers: {
                'access_token': sessionStorage.getItem("token")
            }
        })
            .then(function(response) {
                success(response.data);
            },function(err){
                error(err.data);
            });
    };
});
/**
 * Configure the Routes
 */
app.config(['$stateProvider','$locationProvider', function ($stateProvider,$locationProvider,$rootScope) {
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: '../login/login.html',
            controller: 'loginCtrl'
        })
        .state('home',{
            url: '/home',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../home/home.html',
                    controller: 'homeCtrl'
                },
                'navbar':{
                    templateUrl: '../toolbar/toolbar.html',
                    controller: 'toolbarCtrl'
                }
            }
        })
        .state('visualizarPaciente',{
            url: '/visualizarPaciente',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../paciente/paciente.html',
                    controller: 'pacienteCtrl'
                },
                'navbar':{
                    templateUrl: '../toolbar/toolbar.html',
                    controller: 'toolbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs', {
            abstract: true,
            url: '/tabs',
            templateUrl: '../ficha/navbarFicha.html',
            controller: 'navbarCtrl'/*function($scope) {
                $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    $scope.currentTab = toState.data.selectedTab;
                });*/
            //}
        })
        .state('tabs.eventosSig',{
            url: '/eventosSignificantes',
            data: {
                'selectedTab': 0
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'eventosSignificantes': {
                    templateUrl: '../ficha/eventoSignificantes/eventoSignificantes.html',
                    controller: 'eventoSignificanteCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.neuroLogico',{
            url: '/neurologico',
            data: {
                'selectedTab': 1
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'neuroLogico': {
                    templateUrl: '../ficha/neurologico/neurologico.html',
                    controller: 'neurologicoCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.hemodinamica',{
            url: '/hemodinamica',
            data: {
                'selectedTab': 2
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'hemodinamica': {
                    templateUrl: '../ficha/hemodinamica/hemodinamica.html',
                    controller: 'hemodinamicaCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.respiratorio',{
            url: '/respiratorio',
            data: {
                'selectedTab': 3
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'respiratorio': {
                    templateUrl: '../ficha/respiratorio/respiratorio.html',
                    controller: 'respiratorioCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.gastrointestinal',{
            url: '/gastrointestinal',
            data: {
                'selectedTab': 4
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'gastrointestinal': {
                    templateUrl: '../ficha/gastrointestinal/gastrointestinal.html',
                    controller: 'gastrointestinalCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.renal',{
            url: '/renal',
            data: {
                'selectedTab': 5
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'renal': {
                    templateUrl: '../ficha/renal/renal.html',
                    controller: 'renalCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.hematologico',{
            url: '/hematologico',
            data: {
                'selectedTab': 6
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'hematologico': {
                    templateUrl: '../ficha/hematologico/hematologico.html',
                    controller: 'hematologicoCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.endocrino',{
            url: '/endocrino',
            data: {
                'selectedTab': 7
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'endocrino': {
                    templateUrl: '../ficha/endocrino/endocrino.html',
                    controller: 'endocrinoCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.infeccioso',{
            url: '/infeccioso',
            data: {
                'selectedTab': 9
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'infeccioso': {
                    templateUrl: '../ficha/infeccioso/infeccioso.html',
                    controller: 'infecciosoCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.dispositivos',{
            url: '/dispositivos',
            data: {
                'selectedTab': 10
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'dispositivos': {
                    templateUrl: '../dispositivos/dispositivos.html',
                    controller: 'dispositivosCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.metabolico',{
            url: '/metabolico',
            data: {
                'selectedTab': 11
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'metabolico': {
                    templateUrl: '../ficha/metabolico/metabolico.html',
                    controller: 'metabolicoCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.nutricao',{
            url: '/nutricao',
            data: {
                'selectedTab': 12
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'nutricao': {
                    templateUrl: '../ficha/nutricao/nutricao.html',
                    controller: 'nutricaoCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.psicosocial',{
            url: '/psicosocial',
            data: {
                'selectedTab': 13
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'psicosocial': {
                    templateUrl: '../ficha/psicosocial/psicosocial.html',
                    controller: 'psicosocialCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.listaproblemas',{
            url: '/listaproblemas',
            data: {
                'selectedTab': 14
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'listaproblemas': {
                    templateUrl: '../ficha/listaDeProblemas/listaDeProblemas.html',
                    controller: 'listaDeProblemaCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.analise',{
            url: '/analise',
            data: {
                'selectedTab': 15
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'analise': {
                    templateUrl: '../ficha/analise/analise.html',
                    controller: 'analiseCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.planos',{
            url: '/planos',
            data: {
                'selectedTab': 16
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'planos': {
                    templateUrl: '../ficha/planos/planos.html',
                    controller: 'planosCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.pendencias',{
            url: '/pendencias',
            data: {
                'selectedTab': 17
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'pendencias': {
                    templateUrl: '../ficha/pendencias/pendencias.html',
                    controller: 'pendenciasCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.exames',{
            url: '/exames',
            data: {
                'selectedTab': 18
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'exames': {
                    templateUrl: '../ficha/exames/exames.html',
                    controller: 'examesCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.examesLab',{
            url: '/examesLab',
            data: {
                'selectedTab': 19
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'examesLab': {
                    templateUrl: '../ficha/examesLaboratoriais/examesLaboratoriais.html',
                    controller: 'examesLabCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('tabs.interconsulta',{
            url: '/interconsulta',
            data: {
                'selectedTab': 20
            },
            resolve: {
                authenticate: usuarioLogado
            },
            views: {
                'interconsulta': {
                    templateUrl: '../ficha/interconsulta/interconsulta.html',
                    controller: 'interconsultaCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('pessoa',{
            url: '/pessoa/:acao/',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../pessoa/pessoa.html',
                    controller: 'pessoaCtrl'
                },
                'navbar':{
                    templateUrl: '../toolbar/toolbar.html',
                    controller: 'toolbarCtrl'
                }
            }
        })
        .state('usuario',{
            url:'/profissional/:acao/',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../profissional/profissional.html',
                    controller: 'usuarioCtrl'
                },
                'navbar':{
                    templateUrl: '../toolbar/toolbar.html',
                    controller: 'toolbarCtrl'
                }
            }
        });

    function usuarioLogado($http){
        var req={
            method: 'POST',
            url: '/verifyToken',
            data: {token: sessionStorage.getItem("token") }
        };
        return $http(req);
    }
//    $locationProvider.html5Mode(true);
}]);
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(['momentPickerProvider', function (momentPickerProvider) {
    momentPickerProvider.options({
        /* Picker properties */
        locale: 'pt-br',
        position: "bottom-right",
        autoclose: true,
        /* Extra: Views properties */
        minutesStep:   1
    })}    ]);

app.config(function($mdThemingProvider) {

    $mdThemingProvider.definePalette('paletaAzul', {
        '50': '337ab7',
        '100': '337ab7',
        '200': '337ab7',
        '300': '337ab7',
        '400': '337ab7',
        '500': '337ab7',
        '600': '337ab7',
        '700': '337ab7',
        '800': '337ab7',
        '900': '337ab7',
        'A100': '337ab7',
        'A200': '337ab7',
        'A400': '337ab7',
        'A700': '337ab7',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
    $mdThemingProvider
        .theme('temaNavbar')
        .primaryPalette('yellow')
        .warnPalette('red')
        .accentPalette('yellow')
        .backgroundPalette('paletaAzul')
    $mdThemingProvider
        .theme('temaToolbar')
        .primaryPalette('paletaAzul')
        .warnPalette('paletaAzul')
        .accentPalette('paletaAzul')
        .backgroundPalette('paletaAzul');
});
//exemplos de uso da paleta de cores
// .backgroundPalette('light-blue')
// app.config(function ($mdThemingProvider) {
//     $mdThemingProvider
//         .theme('default')
//         .primaryPalette('indigo')
//         .accentPalette('pink')
//         .warnPalette('red')
//         .backgroundPalette('blue-grey');
// });
// app.config(['momentPickerProvider', function (momentPickerProvider) {
//     momentPickerProvider.options({
//         /* Picker properties */
//         locale:        'pt-br',
//         format:        'lll',
//         minView:       'year',
//         maxView:       'minute',
//         startView:     'year',
//         autoclose:     true,
//         today:         false,
//         keyboard:      false,
//
//         /* Extra: Views properties */
//         leftArrow:     '&larr;',
//         rightArrow:    '&rarr;',
//         yearsFormat:   'YYYY',
//         monthsFormat:  'MMM',
//         daysFormat:    'D',
//         hoursFormat:   'HH:[00]',
//         minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
//         secondsFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
//         minutesStep:   5,
//         secondsStep:   1
//     })}    ]);

