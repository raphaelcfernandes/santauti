/**
 * Created by raphael on 2/21/17.
 */

app.controller('listaDeProblemaCtrl', function($scope,$state,$rootScope) {
    if($rootScope.dados===undefined) {
        $rootScope.dados = {};
    }
    if(Object.keys($rootScope.dados).length > 0 && $rootScope.quantidadeBarra < Object.keys($rootScope.dados).length){
        if($rootScope.determinatedValue <= 100){
            $rootScope.quantidadeBarra +=1;
            $rootScope.determinatedValue = 100; /*(5.3)*(Object.keys($rootScope.dados).length);*/
            console.log($rootScope.determinatedValue);
            console.log($rootScope.quantidadeBarra)
        }
    }

    $scope.items = [];
    $scope.colunaResolvido=false;
    $scope.id=0;
    $scope.add = function () {
        $scope.items.push({
            id: $scope.id
        });
        $scope.id++;
    };
    $scope.remove = function(id){
        var i=0;
        while($scope.items[i].id!==id)
            i++;
        $scope.items.splice(i,1);
    };
    $scope.resolvido = function(id){
        var i=0;
        while($scope.items[i].id!==id)
            i++;
        $scope.items[i].resolvido=true;
        $scope.colunaResolvido=true;
    };
    $scope.cancelarResolvido = function(id){
        var i=0;
        while($scope.items[i].id!==id)
            i++;
        $scope.items[i].resolvido=false;
    };
});
