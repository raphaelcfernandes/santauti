/**
 * Created by raphael on 2/23/17.
 */
app.controller('pendenciasCtrl', function($scope,$rootScope) {
    $scope.items = [];
    $scope.colunaResolvido=false;
    var id=0;
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
        $('#dataCadastrado'+id).datetimepicker;
        id++;
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
        $('#dataResolvido'+id).datetimepicker;
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