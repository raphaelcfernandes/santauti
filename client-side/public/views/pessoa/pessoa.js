/**
 * Created by raphael on 3/16/17.
 */
app.controller('pessoaCtrl', function($scope,$timeout,$state,$rootScope,$http,$sce) {
    /*******************DECLARACAO DE VARIAVEIS E SCOPES*************/
    $scope.dados={};
    $scope.flagcep = -1; //Flag para descobrir qual servidor está conectado
    $scope.isDirty=null;
    $scope.myForm={};
    $scope.myInput=null;
    /*******************DECLARACAO DE VARIAVEIS E SCOPES*************/

    /**
     * LIMPA OS CAMPOS CASO ALGO SEJA DIGITADO DE FORMA INCORRETA
     * Return NADA
     */
    $scope.limparCep = function () {
        $scope.dados.Rua = "";
        $scope.dados.Cidade = "";
        $scope.dados.Bairro = "";
        $scope.flagcep = -1;
    };

    /**
     * ESCREVE OS DADOS NOS CAMPOS DO FORMULÁRIO, MUDANDO SUA FORMA DEPENDENDO
     * DO SERVIDOR QUE RECEBE AS INFORMAÇÕES
     * Return NADA
     */
    $scope.escreve_forms = function (data) {
        if($scope.flagcep == 1){ //Sv 1 Online
            $scope.dados.Bairro = data.bairro;
            $scope.dados.Rua = data.logradouro;
            $scope.dados.Cidade = data.localidade;
        }
        if($scope.flagcep == 2){ //Sv 2 Online
            $scope.dados.Bairro = data.bairro;
            $scope.dados.Rua = data.logradouro;
            $scope.dados.Cidade = data.cidade;
        }
    };

    /**
     * FAZ A REQUISIÇÃO DO JSONP CONTENDO AS INFORMAÇÕES DO CEP DIGITADO
     * Return NADA
     */
    $scope.pesquisaCep = function () {
        //variável cep somente com digitos.
        var troca = $scope.dados.Cep;
        var cep = troca.replace(/\D/g, '');
        //Se cep foi informado
        if (cep != "") {
            //Validação do cep
            var validacep = /^[0-9]{8}$/;
            //Se passa na validação
            if(validacep.test(cep)){
                //A url é colocada como confiável e é feito o get na página do servidor 1
                var url = "//viacep.com.br/ws/"+ cep + "/json/?callback=JSON_CALLBACK";
                $sce.trustAsResourceUrl(url);
                $http.jsonp(url)
                    .success(function(data){
                        $scope.flagcep = 1;
                        $scope.escreve_forms(data);
                        $scope.flagcep = -1;
                    }).error(function(data) {
                    $scope.pesquisaSeg(cep);
                });
            }
            else{
                //cep inválido
                $scope.limparCep();
                alert("Formato de CEP inválido");
            }
        }
        else{
            //cep sem valor
            $scope.limparCep();
        }
    };

    /**
     * FAZ A REQUISIÇÃO DO JSONP CONTENDO AS INFORMAÇÕES DO CEP DIGITADO NO SERVIDOR 2
     * Return NADA
     */
    $scope.pesquisaSeg = function (cep) {
        var urll =  '//api.postmon.com.br/v1/cep/'+cep;
        $sce.trustAsResourceUrl(urll);
        //O get é feito manualmente pois não é uma callback a url
        $http({method: 'GET', url: urll})
            .success(function(data){
                $scope.flagcep = 2;
                $scope.escreve_forms(data);
                $scope.flacep = -1;
            }).error(function(data){
            alert("Escreva os dados manualmente");
        });
    };

    /**
     * ENVIA PARA O SERVIDOR: TOKEN + FORM DATA
     * SERVIDOR VERIFICA TOKEN, CASO ESTEJA CORRETO, TENTA INSERIR NO BANCO
     * Return SUCESSO: SUCESSO CASO TENHA INSERIDO REDIRECIONANDO PARA PAGINA DE CRIACAO USUARIO PROFISSIONAL
     * Return ERRO: RECEBERÁ UM HTTP CODE + MENSAGEM REFERENTE AO ERRO.
     */
    $scope.proximaPagina = function () {
        if(sessionStorage.getItem("acao")=="editar") {
            var data = {
                data: $scope.dados,
                id: sessionStorage.getItem("ID")
            };
            $rootScope.reqWithToken('/updatePessoa', data, 'PUT', function (success) {
                console.log(success);
            }, function (err) {
                if (err === 'Unauthorized') {
                    alert("Voce nao tem permissao para efetuar essa aćao");
                }
                else if (err === 'CPF') {
                    /*
                     ESSA MENSAGEM DE ERRO DEVE APARECER COMO BALAO EMBAIXO DO INPUT DE CPF
                     O INPUT DEVE FICAR COM AS BORDAS VERMELHAS
                     /
                     alert("CPF já existe no sistema");//
                     }
                     else if (err === 'Identidade') {
                     /
                     ESSA MENSAGEM DE ERRO DEVE APARECER COMO BALAO EMBAIXO DO INPUT DE IDENTIDADE
                     O INPUT DEVE FICAR COM AS BORDAS VERMELHAS
                     */
                    alert("Identidade já existe no sistema");//
                }
                else {
                    alert("ERRO ESTRANHO, CONTATE A EQUIPE DE DESENVOLVIMENTO");
                }
                $scope.funcaoDeErro(err);
            });
        }
        else {
            var data = {
                infoPessoa: $scope.dados
            };
            $rootScope.reqWithToken('/inserirPessoa', data, 'POST', function (success) {
                sessionStorage.setItem("ID", success.ID);
                $state.go('usuario', {
                    acao: "novo",
                    id: success.ID
                })
            }, function (err) {
                $scope.funcaoDeErro(err);
            });
        }
    };

    /**
     * Coloca no objeto dados o resultado da requisicao do banco.
     * Requisita ao banco os dados de Pessoa do usuario com ID passado pela sessao
     */
    $scope.cadastroEditar = function () {
        var id= parseInt(sessionStorage.getItem("ID"));
        $rootScope.reqWithToken('/getPessoa?idPessoa='+id,'','GET',function (success) {
            $scope.dados = success;
        },function (err) {
        })
    };

    $scope.funcaoDeErro = function(err){
        if (err === 'Unauthorized') {
            alert("Voce nao tem permissao para efetuar essa aćao");
        }
        else if (err === 'CPF') {
            /*
             ESSA MENSAGEM DE ERRO DEVE APARECER COMO BALAO EMBAIXO DO INPUT DE CPF
             O INPUT DEVE FICAR COM AS BORDAS VERMELHAS
             */
            alert("CPF já existe no sistema");//
        }
        else if (err === 'Identidade') {
            /*
             ESSA MENSAGEM DE ERRO DEVE APARECER COMO BALAO EMBAIXO DO INPUT DE IDENTIDADE
             O INPUT DEVE FICAR COM AS BORDAS VERMELHAS
             */
            alert("Identidade já existe no sistema");//
        }
        else {
            alert("ERRO ESTRANHO, CONTATE A EQUIPE DE DESENVOLVIMENTO");
        }
    };

    if(sessionStorage.getItem("acao")=="editar") {
        $scope.cadastroEditar();
    }

});
