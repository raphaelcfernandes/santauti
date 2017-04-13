/**
 * Created by raphael on 2/21/17.
 */
app.controller('renalCtrl', function($scope,$rootScope) {
    if($rootScope.dados===undefined) {
        $rootScope.dados = [];
    }
    if(Object.keys($rootScope.dados).length > 0 && $rootScope.quantidadeBarra < Object.keys($rootScope.dados).length){
        if($rootScope.determinateValue <= 100){
            $rootScope.quantidadeBarra +=1;
            $rootScope.determinateValue = (5.3)*(Object.keys($rootScope.dados).length);
            console.log($rootScope.determinateValue);
            console.log($rootScope.quantidadeBarra)
        }
    }
});