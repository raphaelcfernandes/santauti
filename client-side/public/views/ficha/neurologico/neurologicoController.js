/**
 * Created by raphael on 2/21/17.
 */

app.controller('neurologicoCtrl', function($scope,$rootScope) {
    if($rootScope.dados===undefined) {
        $rootScope.dados = {};
    }
    /*****SCOPE DECLARATION****/
    $scope.resultado = 0;
    /*****SCOPE DECLARATION****/

    /*****VAR DECLARATION****/
    var anteriorOcular = null;
    var anteriorVerbal = null;
    var anteriorMotora = null;
    /*****VAR DECLARATION****/

    /*****METHODS DECLARATION****/
    $scope.updateOcular = function(){
        var ocular = parseInt($scope.ocular);
        if(anteriorOcular == null)
            anteriorOcular = ocular;
        if(anteriorOcular != ocular){
            $scope.resultado -=anteriorOcular;
            anteriorOcular = ocular;
        }
        $scope.resultado += anteriorOcular;
    };
    $scope.updateVerbal = function () {
        var verbal = parseInt($scope.verbal);
        if(anteriorVerbal == null)
            anteriorVerbal = verbal;
        if(anteriorVerbal != verbal){
            $scope.resultado -= anteriorVerbal;
            anteriorVerbal = verbal;
        }
        $scope.resultado += anteriorVerbal;
    };
    $scope.updateMotora = function () {
        var motora = parseInt($scope.motora);
        if(anteriorMotora == null)
            anteriorMotora = motora;
        if(anteriorMotora != motora){
            $scope.resultado -= anteriorMotora;
            anteriorMotora = motora;
        }
        $scope.resultado += anteriorMotora;
    };
    $scope.updateEscalaRamsay = function () {
        return parseInt($scope.ramsay);
    }
    $scope.respostaOcular= {
        model: respostaOcular,
        options: [
            {value: 1, name: '1 - Nenhuma'},
            {value: 2, name: '2 - À dor'},
            {value: 3, name: '3 - À voz'},
            {value: 4, name: '4 - Espontânea'}]
    };
    $scope.respostaVerbal= {
        model: respostaVerbal,
        options: [
            {value: 1, name: '1 - Nenhuma'},
            {value: 2, name: '2 - Palavras incompreensíveis'},
            {value: 3, name: '3 - Palavras inapropriadas'},
            {value: 4, name: '4 - Confusa'},
            {value: 5, name: '5 - Orientada'}]
    };
    $scope.respostaMotora= {
        model: respostaMotora,
        options: [
            {value: 1, name: '1 - Nenhuma'},
            {value: 2, name: '2 - Extensão anormal'},
            {value: 3, name: '3 - Flexão anormal'},
            {value: 4, name: '4 - Movimento de retirada'},
            {value: 5, name: '5 - Localiza dor'},
            {value: 6, name: '6 - Obedece comandos'}]
    };
    $scope.escalaRamsay = {
        model : escalaRamsay,
        options:[
            {value: 1, name: 'Grau 1: paciente ansioso, agitado'},
            {value: 2, name: 'Grau 2: cooperativo, orientado, tranquilo'},
            {value: 3, name: 'Grau 3: sonolento, atendendo aos comandos'},
            {value: 4, name: 'Grau 4: dormindo, responde rapidamente ao estímulo glabelar ou ao estímulo sonoro vigoroso'},
            {value: 5, name: 'Grau 5: dormindo, responde lentamente ao estímulo glabelar ou ao estímulo sonoro vigoroso'},
            {value: 6, name: 'Grau 6: dormindo, sem resposta'}
        ]
    };
    /*****METHODS DECLARATION****/
});
