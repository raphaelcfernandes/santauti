/**
 * Created by raphael on 2/16/17.
 */
app.controller('toolbarCtrl',function($scope){
    $scope.destroySession = function () {
        sessionStorage.clear();
    };
});