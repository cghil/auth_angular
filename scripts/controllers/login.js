myApp.controller('login', ['$scope', '$log', function($scope, $log){
	
	$scope.email = '';
	$scope.password = '';

	$scope.submit = function(){
		var user = {email: $scope.email, password: $scope.password};
		$log.log(user)
	};

}]);