/**
 * Created by raphael on 2/22/17.
 */
app.controller('dispositivosCtrl', function($scope,$rootScope) {
    /**********SCOPE VARIABLES***********/
    $scope.cateterVenosoInput=false;
    $scope.cateterHemodialiseInput=false;
    $scope.cateterPaiInput=false;
    $scope.drenoToraxInput=false;
    $scope.drenoAbdominalInput=false;
    $scope.sondaVesicalInput=false;
    $scope.tuboOrotraquialInput=false;
    $scope.traqueostomiaInput=false;
    $scope.venocliseInput=false;
    $scope.sondaEnteralInput=false;
    $scope.sondaOroenteralInput=false;
    $scope.sondaNasoenteralInput=false;
    $scope.sondaOrogastricaInput=false;
    $scope.sondaNasoGastricalInput=false;
    /**********SCOPE VARIABLES***********/


    /***********************************FUNCTIONS****************************************/
    $scope.cateterVenoso = function(flag){
        flag == true ? $scope.cateterVenosoInput=true : $scope.cateterVenosoInput=false;
    };
    $scope.cateterHemodialise = function (flag) {
        flag == true ? $scope.cateterHemodialiseInput=true : $scope.cateterHemodialiseInput=false;
    };
    $scope.cateterPai = function (flag) {
        flag == true ? $scope.cateterPaiInput=true : $scope.cateterPaiInput=false;
    };
    $scope.drenoTorax = function (flag) {
        flag == true ? $scope.drenoToraxInput=true : $scope.drenoToraxInput=false;
    };
    $scope.drenoAbdominal = function (flag) {
        flag == true ? $scope.drenoAbdominalInput=true : $scope.drenoAbdominalInput=false;
    };
    $scope.sondaVesical = function (flag) {
        flag == true ? $scope.sondaVesicalInput=true : $scope.sondaVesicalInput=false;
    };
    $scope.tuboOrotraquial = function (flag) {
        flag == true ? $scope.tuboOrotraquialInput=true : $scope.tuboOrotraquialInput=false;
    };
    $scope.traqueostomia = function (flag) {
        flag == true ? $scope.traqueostomiaInput=true : $scope.traqueostomiaInput=false;
    };
    $scope.venoclise = function (flag) {
        flag == true ? $scope.venocliseInput=true : $scope.venocliseInput=false;
    };
    $scope.sondaEnteral = function (flag) {
        flag == true ? $scope.sondaEnteralInput=true : $scope.sondaEnteralInput=false;
    };
    $scope.sondaOroenteral = function (flag) {
        flag == true ? $scope.sondaOroenteralInput=true : $scope.sondaOroenteralInput=false;
    };
    $scope.sondaNasoenteral = function (flag) {
        flag == true ? $scope.sondaNasoenteralInput=true : $scope.sondaNasoenteralInput=false;
    };
    $scope.sondaOrogastrica = function (flag) {
        flag == true ? $scope.sondaOrogastricaInput=true : $scope.sondaOrogastricaInput=false;
    };
    $scope.sondaNasoGastrical = function (flag) {
        flag == true ? $scope.sondaNasoGastricalInput=true : $scope.sondaNasoGastricalInput=false;
    };
    /***********************************FUNCTIONS****************************************/
});