var app = angular.module('SantaUTIApp', [
    'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    // Home
        .when("/", {
            templateUrl: "views/login/login.html",
            controller: "loginCtrl"
        })
        .when("/home",{
            templateUrl: "views/home/home.html",
            controller: "homeCtrl"
        })
        //.otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);
