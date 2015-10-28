var myApp = angular.module("myApp", [
    'ngAnimate',
    'ngResource',
    'ngRoute'
]);

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'main'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'login'
		})
		.otherwise({
			redirectTo: '/'
		});
});