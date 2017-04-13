/**
 * Created by raphael on 2/16/17.
 */
app.controller('toolbarCtrl',function($scope,$state){
    $scope.destroySession = function () {
        $state.go("login");
        sessionStorage.clear();
    };
    $scope.currentNavItem = "Home";
});