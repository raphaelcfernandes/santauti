angular.module('app.index',['ui.router']).controller('indexCtrl',['$scope','$location','$stateParams','$http', function($scope,$location,$stateParams,$http) {
    $scope.submit = function() {
        var data = {
            user: $scope.uname,
            passw: $scope.passwd
        };
        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/login',
            method: 'POST'
        };
        var req = $https.request(options,data).success(function(req,res,next) {
            console.log(req);
            console.log(res);
            if(res===200){//Login and username is right, redirect to home
                //console.log(req);
                $location.path("/home");
            }
        });
    };
}]);
