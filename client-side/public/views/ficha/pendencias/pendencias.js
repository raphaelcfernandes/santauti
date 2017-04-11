/**
 * Created by raphael on 2/23/17.
 */
app.controller('pendenciasCtrl', function($scope,$rootScope) {
    /********************SCOPES AND VARIABLES **************************/
    $scope.items = [];
    $scope.colunaResolvido=false;
    var id=0;
    /********************SCOPES AND VARIABLES **************************/

    if($rootScope.dados===undefined) {
        $rootScope.dados = {};
        //$rootScope.dados.pendencias=[];
    }
    if(Object.keys($rootScope.dados).length > 0 && $rootScope.quantidadeBarra < Object.keys($rootScope.dados).length){
        if($rootScope.determinateValue <= 100){
            $rootScope.quantidadeBarra +=1;
            $rootScope.determinateValue = (5.3)*(Object.keys($rootScope.dados).length);
            console.log($rootScope.determinateValue);
            console.log($rootScope.quantidadeBarra)
        }
    }
    $scope.res={};
    $rootScope.reqWithToken('/getPendenciasPorIdPaciente?idPaciente='+sessionStorage.getItem("ID"),sessionStorage.getItem("token"), 'GET', function (success) {
        $scope.res=success;
        console.log($scope.res);
    }, function (err) {
        console.log(err);
    });



    $scope.add = function () {
        $scope.items.push({
            id: id,
            inlineChecked: false,
            question: "",
            questionPlaceholder: "Descricao",
            dataCadastrado: new Date(),
            dataResolvido: new Date(),
            resolvido: false
        });
        id++;
        console.log($rootScope.dados);
    };
    $scope.remove = function(id){
        var i=0;
        while($scope.items[i].id!=id)
            i++;
        $scope.items.splice($scope.items.indexOf(i));
        this.id--;
        checkResolvido();
    };
    $scope.resolvido = function(id){
        var i=0;
        while($scope.items[i].id!=id)
            i++;
        $scope.items[i].resolvido=true;
        $scope.colunaResolvido=true;
        checkResolvido();
    };
    $scope.cancelarResolvido = function(id){
        var i=0;
        while($scope.items[i].id!=id)
            i++;
        $scope.items[i].resolvido=false;
        checkResolvido();
    };
    function checkResolvido(){
        var i=0,flag=false;
        for(i;i<$scope.items.length;i++)
            if($scope.items[i].resolvido==true)
                flag=true;
        flag == true ? $scope.colunaResolvido=true : $scope.colunaResolvido=false;
    }
});