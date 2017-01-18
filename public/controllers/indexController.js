angular.module('app.index',['ui.router']).controller('indexCtrl',['$scope','$location','$stateParams','$http', function($scope,$location,$stateParams,$http) {
    $scope.submit = function() {
        $http.post("/app/login").success(function(req,res,next) {
            console.log(req);
        });
    };
}]);
