/**
 * Created by raphael on 1/9/17.
 */

angular.module('MyApp', ['ui.router'])
.config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'webapp/controllers/indexController'
        })
}]);