var app = angular.module('SantaUTIApp', ['datetimepicker','ui.router','ngStorage']);

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
            .success(function(data) {
                success(data);
            })
            .error(function(err) {
                error(err);
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
            .success(function(data) {
                //Loading.close({});
                success(data);
            })
            .error(function(err) {
                //Loading.close({});
                error(err);
            });
    };
});

/**
 * Configure the Routes
 */
app.config(['$stateProvider','$locationProvider', function ($stateProvider,$locationProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: '../login/login.html',
            controller: 'loginCtrl'
        })
        .state('home',{
            url: '/home',
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
            url: '/visualizarPaciente/:id',
            views:{
                '':{
                    templateUrl: '../paciente/paciente.html',
                    controller: 'pacienteCtrl'
                },
                'navbar':{
                    templateUrl: '../toolbar/toolbar.html',
                    controller: 'headerCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }
            }
        })
        .state('listaDeProblemas',{
            url: '/listaDeProblemas',
            views:{
                '':{
                    templateUrl: '../ficha/listaDeProblemas/listaDeProblemas.html',
                    controller: 'listaDeProblemaCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }
            }
        })
        .state('eventoSignificantes',{
            url: '/eventoSignificantes',
            views:{
                '':{
                    templateUrl: '../ficha/eventoSignificantes/eventoSignificantes.html',
                    controller: 'eventoSignificanteCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                }
            }
        })
        .state('neurologico',{
            url: '/neurologico',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }
            }
        })
        .state('hemodinamica',{
            url: '/hemodinamica',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('respiratorio',{
            url: '/respiratorio',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('gastrointestinal',{
            url: '/gastrointestinal',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('renal',{
            url: '/renal',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('hematologico',{
            url: '/hematologico',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('endocrino',{
            url: '/endocrino',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('infeccioso',{
            url: '/infeccioso',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('dispositivos',{
            url: '/dispositivos',
            views:{
                '':{
                    templateUrl: '../ficha/dispositivos/dispositivos.html',
                    controller: 'dispositivosCtrl'
                },
                'navbar':{
                    templateUrl: '../ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('metabolico',{
            url: '/metabolico',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('nutricao',{
            url: '/nutricao',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('psicosocial',{
            url: '/psicosocial',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('analise',{
            url: '/analise',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('pendencias',{
            url: '/pendencias',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('exames',{
            url: '/exames',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('interconsulta',{
            url: '/interconsulta',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('planos',{
            url: '/planos',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('examesLab',{
            url: '/examesLab',
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
                    templateUrl: '../informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('pessoa',{
            url: '/pessoa/:acao/:id?',
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
            url:'/profissional/:acao/:id',
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
        })
//    $locationProvider.html5Mode(true);
}]);
app.config(['datetimepickerProvider',function (datetimepickerProvider) {
        datetimepickerProvider.setOptions({
            locale:  'pt-br',
            keepOpen: false,
            showTodayButton: true,
            showClear:true,
            // format: 'DD MMMM YYYY - HH:mm',
            tooltips: {
                today: 'Selecionar hoje',
                clear: 'Excluir data',
                close: 'Close the picker',
                selectMonth: 'Selecionar mês',
                prevMonth: 'Mês anterior',
                nextMonth: 'Próximo mês',
                selectYear: 'Selecione o ano',
                prevYear: 'Ano anterior',
                nextYear: 'Próximo ano',
                hours: 'Selecionar horário',
                time: 'Selecionar hora'
            },
            icons: {
                time: 'glyphicon glyphicon-time',
                date: 'glyphicon glyphicon-calendar',
                up: 'glyphicon glyphicon-chevron-up',
                down: 'glyphicon glyphicon-chevron-down',
                previous: 'glyphicon glyphicon-chevron-left',
                next: 'glyphicon glyphicon-chevron-right',
                today: 'glyphicon glyphicon-screenshot',
                clear: 'glyphicon glyphicon-trash',
                close: 'glyphicon glyphicon-remove'
            }

        });
    }
]);