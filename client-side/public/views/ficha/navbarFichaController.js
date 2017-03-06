/**
 * Created by raphael on 2/21/17.
 */
app.controller('navbarCtrl', function($scope,$state) {
    $scope.button=false;
    $scope.Button = function(){
        $scope.button=true;
    }
});
