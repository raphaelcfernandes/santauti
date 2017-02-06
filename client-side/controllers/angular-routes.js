// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ui.router']).config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/about', {
            templateUrl : '../views/home.html'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'views/pages/contact.html'
        });

    $locationProvider.html5Mode(true);
});