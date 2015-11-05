myApp.controller('signup', ['$scope', '$log', '$http', 'myConfig', 'sessionService', '$location', function($scope, $log, $http, myConfig, sessionService, $location){
	
	$scope.email = '';
	$scope.password = '';
	$scope.passwordConfirmation = '';

	$scope.submit = function(){
		var user = {email: $scope.email, password: $scope.password, password_confirmation: $scope.passwordConfirmation};

		$http({
			method: 'POST',
			url: myConfig.backend + '/api/v1/users',
			data: {user: user},
			headers: {'Content-Type': 'application/json'}
		}).then(function(response){
			var email = response.data.email,
				token = response.data.auth_token;
				id = response.data.id;

			sessionStorage.setItem('auth', token);
			sessionStorage.setItem('email', email);
			sessionStorage.setItem('id', id);

			sessionService.isLoggedIn = sessionService.isUserAuthorized();
			
			$location.path('/users/'+id);

		}, function(response){
			if(response.status===500){
				$scope.errors = response.statusText;
			} else {
				$scope.errors = response.data.errors || 'Internal Error';
			}

		});
	};
}]);