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
                'navbar':{
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
                'navbar':{
                    templateUrl: 'views/toolbar/header.html',
                    controller: 'headerCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }
            }
        })
        .state('listaDeProblemas',{
            url: '/listaDeProblemas',
            views:{
                '':{
                    templateUrl: 'views/ficha/listaDeProblemas/listaDeProblemas.html',
                    controller: 'listaDeProblemaCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }
            }
        })
        .state('eventoSignificantes',{
            url: '/eventoSignificantes',
            views:{
                '':{
                    templateUrl: 'views/ficha/eventoSignificantes/eventoSignificantes.html',
                    controller: 'eventoSignificanteCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                }
            }
        })
        .state('neurologico',{
            url: '/neurologico',
            views:{
                '':{
                    templateUrl: 'views/ficha/neurologico/neurologico.html',
                    controller: 'neurologicoCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }
            }
        })
        .state('hemodinamica',{
            url: '/hemodinamica',
            views:{
                '':{
                    templateUrl: 'views/ficha/hemodinamica/hemodinamica.html',
                    controller: 'hemodinamicaCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('respiratorio',{
            url: '/respiratorio',
            views:{
                '':{
                    templateUrl: 'views/ficha/respiratorio/respiratorio.html',
                    controller: 'respiratorioCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('gastrointestinal',{
            url: '/gastrointestinal',
            views:{
                '':{
                    templateUrl: 'views/ficha/gastrointestinal/gastrointestinal.html',
                    controller: 'gastrointestinalCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('renal',{
            url: '/renal',
            views:{
                '':{
                    templateUrl: 'views/ficha/renal/renal.html',
                    controller: 'renalCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('hematologico',{
            url: '/hematologico',
            views:{
                '':{
                    templateUrl: 'views/ficha/hematologico/hematologico.html',
                    controller: 'hematologicoCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('endocrino',{
            url: '/endocrino',
            views:{
                '':{
                    templateUrl: 'views/ficha/endocrino/endocrino.html',
                    controller: 'endocrinoCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('infeccioso',{
            url: '/infeccioso',
            views:{
                '':{
                    templateUrl: 'views/ficha/infeccioso/infeccioso.html',
                    controller: 'infecciosoCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('dispositivos',{
            url: '/dispositivos',
            views:{
                '':{
                    templateUrl: 'views/ficha/dispositivos/dispositivos.html',
                    controller: 'dispositivosCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('metabolico',{
            url: '/metabolico',
            views:{
                '':{
                    templateUrl: 'views/ficha/metabolico/metabolico.html',
                    controller: 'metabolicoCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('nutricao',{
            url: '/nutricao',
            views:{
                '':{
                    templateUrl: 'views/ficha/nutricao/nutricao.html',
                    controller: 'nutricaoCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('psicosocial',{
            url: '/psicosocial',
            views:{
                '':{
                    templateUrl: 'views/ficha/psicosocial/psicosocial.html',
                    controller: 'psicosocialCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('analise',{
            url: '/analise',
            views:{
                '':{
                    templateUrl: 'views/ficha/analise/analise.html',
                    controller: 'analiseCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('pendencias',{
            url: '/pendencias',
            views:{
                '':{
                    templateUrl: 'views/ficha/pendencias/pendencias.html',
                    controller: 'pendenciasCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('exames',{
            url: '/exames',
            views:{
                '':{
                    templateUrl: 'views/ficha/exames/exames.html',
                    controller: 'examesCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('interconsulta',{
            url: '/interconsulta',
            views:{
                '':{
                    templateUrl: 'views/ficha/interconsulta/interconsulta.html',
                    controller: 'interconsultaCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('planos',{
            url: '/planos',
            views:{
                '':{
                    templateUrl: 'views/ficha/planos/planos.html',
                    controller: 'planosCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
        .state('examesLab',{
            url: '/examesLab',
            views:{
                '':{
                    templateUrl: 'views/ficha/examesLaboratoriais/examesLaboratoriais.html',
                    controller: 'examesLabCtrl'
                },
                'navbar':{
                    templateUrl: 'views/ficha/navbarFicha.html',
                    controller: 'navbarCtrl'
                },
                'informacaoBox':{
                    templateUrl: 'views/informacaoBox/informacaoBox.html'
                }

            }
        })
//    $locationProvider.html5Mode(true);
}]);
