/**
 * Created by raphael on 1/9/17.
 */

var routerApp = angular.module('app', ['app.index','ui.router']);
routerApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,   $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home',{
        url:'/',
        templateUrl:'index.html',
        controller: 'webapp/controllers/indexController.js'
        }
    );
}]);