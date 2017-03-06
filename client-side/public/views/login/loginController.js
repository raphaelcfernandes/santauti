/**
 * Created by raphael on 2/9/17.
 */

app.controller('loginCtrl', function($scope,  $state, $window, $location, $timeout,$http) {

    $scope.showGreeting = false;
    $scope.showInvalidUserPasswordMessage = function() {
        $scope.msg="Usuario e/ou Senha inválidos.";
        $scope.showGreeting = true;
        $timeout(function(){
            $scope.showGreeting = false;
        }, 10000);
    };

    $scope.login = function(){
        var data={
            user: $scope.user,
            passw: $scope.password
        }
        $http.post('/login',data)
            .success(function(data,status,headers){
            if(data=='400')
                $scope.showInvalidUserPasswordMessage();
            else
                $state.go('home');
        });
        // if($scope.user === '1' && $scope.password === '2')
        //     $state.go('home');
        // else
        //     $scope.showInvalidUserPasswordMessage();
    };

});
