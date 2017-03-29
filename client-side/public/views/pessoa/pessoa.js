/**
 * Created by raphael on 3/16/17.
 */
app.controller('pessoaCtrl', function($scope,$timeout,$state,$rootScope,$http,$sce,$stateParams) {
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

    $scope.validaCPF = function () {
        if($scope.dados.CPF != null) {
            var cpf_t = $scope.dados.CPF.replace(/\.|-/g,"");
            var digito1,digito2;
            if(cpf_t.length == 11 && cpf_t != null && !isNaN(cpf_t)) {
                if(/^(.)\1+$/.test(cpf_t)){
                    return false;
                }
                else {
                    digito1 = 11-((cpf_t[0]*10 +cpf_t[1]*9 +cpf_t[2]*8 +cpf_t[3]*7 +cpf_t[4]*6 +cpf_t[5]*5 +cpf_t[6]*4 +cpf_t[7]*3 +cpf_t[8]*2)%11);
                    if(digito1 > 9) {
                        digito1 = 0;
                    }
                    digito2 = 11-((cpf_t[0]*11 +cpf_t[1]*10 +cpf_t[2]*9 +cpf_t[3]*8 +cpf_t[4]*7 +cpf_t[5]*6 +cpf_t[6]*5 +cpf_t[7]*4 +cpf_t[8]*3 + cpf_t[9]*2)%11);
                    if(digito2 > 9) {
                        digito2 = 0;
                    }
                    if(digito1 == cpf_t[9] && digito2 == cpf_t[10]) {
                        $scope.dados.CPF = cpf_t;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        else{
            return false;
        }

    };

    /**
     * ENVIA PARA O SERVIDOR: TOKEN + FORM DATA
     * SERVIDOR VERIFICA TOKEN, CASO ESTEJA CORRETO, TENTA INSERIR NO BANCO
     * Return SUCESSO: SUCESSO CASO TENHA INSERIDO REDIRECIONANDO PARA PAGINA DE CRIACAO USUARIO PROFISSIONAL
     * Return ERRO: RECEBERÁ UM HTTP CODE + MENSAGEM REFERENTE AO ERRO.
     */
    $scope.proximaPagina = function () {
        if($stateParams.acao==="editar") {
            if($scope.dados.Apartamento=='')
                $scope.dados.Apartamento = null;
            var data = {
                data: $scope.dados,
                id: sessionStorage.getItem("ID")
            };
            $rootScope.reqWithToken('/updatePessoa', data, 'PUT', function (success) {
                $state.go('santauti.usuario', {
                    acao: "editar"
                })
            }, function (err) {
                $scope.getDataErro(err);
            });
        }
        else {
            if($scope.validaCPF()){
                var data = {
                    infoPessoa: $scope.dados
                };
                $rootScope.reqWithToken('/inserirPessoa', data, 'POST', function (success) {
                    sessionStorage.setItem("ID", success.ID);
                    $state.go('santauti.usuario', {
                        acao: "novo"
                    })
                }, function (err) {
                    $scope.getDataErro(err);
                });
            }else{
                $scope.getDataErro("CPFI");
            }
        }
    };

    $scope.getDataErro = function(err){
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
        else if (err === 'CPFI'){
            alert("CPF Inválido");
        }
        else {
            alert("ERRO ESTRANHO, CONTATE A EQUIPE DE DESENVOLVIMENTO");
        }
    };

    /**
     * Coloca no objeto dados o resultado da requisicao do banco.
     * Requisita ao banco os dados de Pessoa do usuario com ID passado pela sessao
     */
    $scope.cadastroEditar = function () {
        var id = parseInt(sessionStorage.getItem("ID"));
        $rootScope.reqWithToken('/getPessoa?idPessoa='+id,'','GET',function (success) {
            $scope.dados = success;
        },function (err) {
            console.log(err);
        })
    };

    if($stateParams.acao ==="editar") {
        $scope.cadastroEditar();
    }

});
