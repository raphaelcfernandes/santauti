/**
 * Created by raphael on 2/24/17.
 */
app.controller('examesLabCtrl', function($scope,$rootScope) {
    if($rootScope.dados===undefined) {
        $rootScope.dados = {};
    }
    if(Object.keys($rootScope.dados).length > 0 && $rootScope.quantidadeBarra < Object.keys($rootScope.dados).length){
        if($rootScope.determinatedValue <= 100){
            $rootScope.quantidadeBarra +=1;
            $rootScope.determinatedValue = (5.3)*(Object.keys($rootScope.dados).length);
            console.log($rootScope.determinatedValue);
            console.log($rootScope.quantidadeBarra)
        }
    }
});