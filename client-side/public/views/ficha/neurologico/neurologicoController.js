/**
 * Created by raphael on 2/21/17.
 */

app.controller('neurologicoCtrl', function($scope,$rootScope) {
    if($rootScope.dados===undefined) {
        $rootScope.dados = {};
    }
    if(Object.keys($rootScope.dados).length > 0 && $rootScope.quantidadeBarra < Object.keys($rootScope.dados).length){
        if($rootScope.determinatedValue <= 100){
            $rootScope.quantidadeBarra +=1;
            $rootScope.determinatedValue = (5.3)*(Object.keys($rootScope.dados).length);
        }
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
        var ocular = parseInt($rootScope.dados.neurologico.AberturaOcular);
        if(anteriorOcular == null)
            anteriorOcular = ocular;
        if(anteriorOcular != ocular){
            $scope.resultado -=anteriorOcular;
            anteriorOcular = ocular;
        }
        $scope.resultado += anteriorOcular;
    };
    $scope.updateVerbal = function () {
        var verbal = parseInt($rootScope.dados.neurologico.RespostaVerbal);
        if(anteriorVerbal == null)
            anteriorVerbal = verbal;
        if(anteriorVerbal != verbal){
            $scope.resultado -= anteriorVerbal;
            anteriorVerbal = verbal;
        }
        $scope.resultado += anteriorVerbal;
    };
    $scope.updateMotora = function () {
        var motora = parseInt($rootScope.dados.neurologico.RespostaMotora);
        if(anteriorMotora == null)
            anteriorMotora = motora;
        if(anteriorMotora != motora){
            $scope.resultado -= anteriorMotora;
            anteriorMotora = motora;
        }
        $scope.resultado += anteriorMotora;
    };
    $scope.updateEscalaRamsay = function () {
        return parseInt($rootScope.dados.neurologico.EscalaRamsay);
    };
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
            {value: 1, name: '1 - Paciente ansioso, agitado'},
            {value: 2, name: '2 - Cooperativo, orientado, tranquilo'},
            {value: 3, name: '3 - Sonolento, atendendo aos comandos'},
            {value: 4, name: '4 - Dormindo, responde rapidamente ao estímulo glabelar ou ao estímulo sonoro vigoroso'},
            {value: 5, name: '5 - Dormindo, responde lentamente ao estímulo glabelar ou ao estímulo sonoro vigoroso'},
            {value: 6, name: '6 - Dormindo, sem resposta'}
        ]
    };

    /*****METHODS DECLARATION****/
});
