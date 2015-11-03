myApp.controller('navController', ['$scope', '$location', 'sessionService', 'myConfig', function($scope, $location, sessionService, myConfig){
	
	$scope.isActive = function(viewLocation){
		return viewLocation === $location.path();
	};

	$scope.logOut = function(){
		sessionService.logOutUser();
		$location.path('/')
	};

	$scope.isLoggedIn = sessionService.isLoggedIn;

	$scope.$watch(function(){ return sessionService.isLoggedIn}, function(){

		$scope.isLoggedIn = sessionService.isLoggedIn;
		
	});

}]);