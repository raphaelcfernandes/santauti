/**
 * Created by raphael on 2/21/17.
 */
app.controller('navbarCtrl', function($scope,$state,$location) {


    $scope.determinateValue = 100;

    $scope.selectedIndex=0;
    $scope.$on('$stateChangeSuccess', function(event, toState) {
        $scope.selectedIndex = toState.data.selectedTab;
    });


    $scope.button=false;
    $scope.Button = function(){
        $scope.button=true;
    };
    $scope.destroySession = function () {
        sessionStorage.clear();
    };
});
