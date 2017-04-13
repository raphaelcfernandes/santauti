/**
 * Created by raphael on 2/21/17.
 */
app.controller('eventoSignificanteCtrl', function($scope,$state,$rootScope) {
    /*********************SCOPES AND VARIABLES************************/
    $scope.status = "Mostrar";
    $scope.flagStatus=false;
    /*********************SCOPES AND VARIABLES************************/

    /**
     * flagStatus==false? Esconde eventos significantes antigos
     * flagStatus==true? Mostra eventos significantes antigos
     */
    $scope.mostrarStatus = function () {
        if($scope.flagStatus==false){
            $scope.flagStatus = true;
            $scope.status="Esconder";
        }
        else {
            $scope.flagStatus = false;
            $scope.status="Mostrar";
        }
    };
    /**
     * Deve-se criar esse objeto para armazenar os dados das Tabs
     */
    if($rootScope.dados===undefined) {
        $rootScope.dados = [];
    }

    if(Object.keys($rootScope.dados).length > 0 && $rootScope.quantidadeBarra < Object.keys($rootScope.dados).length){
        if($rootScope.determinateValue < 100){
            $rootScope.quantidadeBarra +=1;
            $rootScope.determinateValue = (5.3)*(Object.keys($rootScope.dados).length);
            console.log($rootScope.determinateValue);
            console.log($rootScope.quantidadeBarra)
        }
    }
    //Para Visualizar dentro do objeto, é só checar o tamanho dentro deles, dai consigo dividir a progress bar em elementos

    /**
     * Verifica se fichasAntigas foi inicializada. Esse if DEVE existir para evitar que seja feito requisicao no banco
     * toda vez que seja acessado a tab de Eventos Significantes
     */
    if($rootScope.fichasAntigas===undefined) {
        $rootScope.fichasAntigas={};
        $rootScope.reqWithToken('/getAllEvolucaoByIdPacientePorInternacaoMaisRecente?idPaciente='+sessionStorage.getItem("ID"), '', 'GET', function (success) {
            for(var i=success.length-1;i>=0;i--)
                success[i].DataCriado = moment(success[i].DataCriado, 'YYYY-MM-DD H:m').format("LLL")
            $rootScope.fichasAntigas=success;
            console.log(success);
        }, function (err) {
            console.log(err);
        });
    }
    console.log($rootScope.dados);
});