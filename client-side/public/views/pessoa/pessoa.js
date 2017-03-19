/**
 * Created by raphael on 3/16/17.
 */
app.controller('pessoaCtrl', function($scope,  $state,$rootScope) {
    /*******************DECLARACAO DE VARIAVEIS E SCOPES*************/
    $scope.dados={};
    /*******************DECLARACAO DE VARIAVEIS E SCOPES*************/


    /**
     * ENVIA PARA O SERVIDOR: TOKEN + FORM DATA
     * SERVIDOR VERIFICA TOKEN, CASO ESTEJA CORRETO, TENTA INSERIR NO BANCO
     * Return SUCESSO: SUCESSO CASO TENHA INSERIDO REDIRECIONANDO PARA PAGINA DE CRIACAO USUARIO PROFISSIONAL
     * Return ERRO: RECEBERÁ UM HTTP CODE + MENSAGEM REFERENTE AO ERRO.
     */
    $scope.proximaPagina = function () {
        var data ={
            infoPessoa: $scope.dados,
            token: sessionStorage.getItem("token")
        };

        $rootScope.req('/inserirPessoa',data,'POST',function(success){
            sessionStorage.setItem("ID",success.ID);
            $state.go('usuario',{
                acao: "novo",
                id:success.ID
            })
        },function(err){
            if(err === 'Unauthorized'){
                alert("Voce nao tem permissao para efetuar essa aćao");
            }
            else if(err === 'CPF'){
                /*
                 ESSA MENSAGEM DE ERRO DEVE APARECER COMO BALAO EMBAIXO DO INPUT DE CPF
                 O INPUT DEVE FICAR COM AS BORDAS VERMELHAS
                 */
                alert("CPF já existe no sistema");//
            }
            else if(err === 'Identidade'){
                /*
                 ESSA MENSAGEM DE ERRO DEVE APARECER COMO BALAO EMBAIXO DO INPUT DE IDENTIDADE
                 O INPUT DEVE FICAR COM AS BORDAS VERMELHAS
                 */
                alert("Identidade já existe no sistema");//
            }
            else{
                alert("ERRO ESTRANHO, CONTATE A EQUIPE DE DESENVOLVIMENTO");
            }
        });
    };
});