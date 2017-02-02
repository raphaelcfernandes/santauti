// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])

// configure our routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider

        // route for the home page

            // route for the about page
            .when('/about', {
                templateUrl : '../views/home.html'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'views/pages/contact.html'
            });

        $locationProvider.html5Mode(true);
    });