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
        .state('listaDeProblemas',{
            url: '/listaDeProblemas',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/listaDeProblemas/listaDeProblemas.html',
                    controller: 'listaDeProblemaCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('eventosSignificantes',{
            url: '/eventosSignificantes',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/eventoSignificantes/eventoSignificantes.html',
                    controller: 'eventoSignificanteCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('neurologico',{
            url: '/neurologico',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/neurologico/neurologico.html',
                    controller: 'neurologicoCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }
            }
        })
        .state('hemodinamica',{
            url: '/hemodinamica',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/hemodinamica/hemodinamica.html',
                    controller: 'hemodinamicaCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('respiratorio',{
            url: '/respiratorio',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/respiratorio/respiratorio.html',
                    controller: 'respiratorioCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('gastrointestinal',{
            url: '/gastrointestinal',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/gastrointestinal/gastrointestinal.html',
                    controller: 'gastrointestinalCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('renal',{
            url: '/renal',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/renal/renal.html',
                    controller: 'renalCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('hematologico',{
            url: '/hematologico',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/hematologico/hematologico.html',
                    controller: 'hematologicoCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('endocrino',{
            url: '/endocrino',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/endocrino/endocrino.html',
                    controller: 'endocrinoCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('infeccioso',{
            url: '/infeccioso',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/infeccioso/infeccioso.html',
                    controller: 'infecciosoCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('dispositivos',{
            url: '/dispositivos',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../dispositivos/dispositivos.html',
                    controller: 'dispositivosCtrl'
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
        .state('metabolico',{
            url: '/metabolico',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/metabolico/metabolico.html',
                    controller: 'metabolicoCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('nutricao',{
            url: '/nutricao',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/nutricao/nutricao.html',
                    controller: 'nutricaoCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('psicosocial',{
            url: '/psicosocial',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/psicosocial/psicosocial.html',
                    controller: 'psicosocialCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('analise',{
            url: '/analise',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/analise/analise.html',
                    controller: 'analiseCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('pendencias',{
            url: '/pendencias',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/pendencias/pendencias.html',
                    controller: 'pendenciasCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('exames',{
            url: '/exames',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/exames/exames.html',
                    controller: 'examesCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('interconsulta',{
            url: '/interconsulta',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/interconsulta/interconsulta.html',
                    controller: 'interconsultaCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('planos',{
            url: '/planos',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/planos/planos.html',
                    controller: 'planosCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html',
                    controller: 'informacaoBoxCtrl'
                }

            }
        })
        .state('examesLab',{
            url: '/examesLab',
            resolve: {
                authenticate: usuarioLogado
            },
            views:{
                '':{
                    templateUrl: '../ficha/examesLaboratoriais/examesLaboratoriais.html',
                    controller: 'examesLabCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
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

