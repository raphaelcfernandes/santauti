var app = angular.module('SantaUTIApp', ['ngMaterial','ui.router','ngStorage','qrScanner','moment-picker']);

app.run(function ($rootScope,$location,$window,$state, $stateParams, $http) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

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
                    templateUrl: '../fichas/evolucaoDiaria/listaDeProblemas/listaDeProblemas.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/eventoSignificantes/eventoSignificantes.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/neurologico/neurologico.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/hemodinamica/hemodinamica.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/respiratorio/respiratorio.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/gastrointestinal/gastrointestinal.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/renal/renal.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/hematologico/hematologico.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/endocrino/endocrino.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/infeccioso/infeccioso.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/dispositivos/dispositivos.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
                    controller: 'navbarCtrl'
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
                    templateUrl: '../fichas/evolucaoDiaria/metabolico/metabolico.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/nutricao/nutricao.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/psicosocial/psicosocial.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/analise/analise.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/pendencias/pendencias.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/exames/exames.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/interconsulta/interconsulta.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/planos/planos.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
                    templateUrl: '../fichas/evolucaoDiaria/examesLaboratoriais/examesLaboratoriais.html',
                    controller: 'evolucaoDiariaCtrl'
                },
                'navbar':{
                    templateUrl: '../fichas/evolucaoDiaria/navbarFicha.html',
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
