var myApp = angular.module("myApp", [
    'myApp.development',
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngMessages'
]);


// development environment constants
angular.module('myApp.development', [])
.constant('myConfig', {
	backend: 'http://localhost:3000'
});

// need to config backend for code
angular.module('myApp.production', [])
.constant('myConfig', {
	backend: 'unknown right now'
});

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
		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'about'
		})
		.when('/users/:id', {
			templateUrl: 'views/user.html',
			controller: 'user'
		})
		.otherwise({
			redirectTo: '/'
		});
});