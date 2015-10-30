myApp.controller('login', ['$scope', '$log', '$http', function($scope, $log, $http) {

    $scope.email = '';
    $scope.password = '';
    $scope.messages = false;

    $scope.submit = function() {

        var user = {
            email: $scope.email,
            password: $scope.password
        };

        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/sessions',
            data: user,
            headers: { 'Content-Type': 'application/json' }
        }).then(function(response) {
        	
        	$scope.messages = false;

            var email = response.data.email;
            var token = response.data.auth_token;
            var id = response.data.id;

            sessionStorage.setItem('auth', token);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('id', id);

        }, function(response) {

            $scope.messages = true;

            if (response.status === 500) {
                $scope.errors = response.statusText;
            } else {
                $scope.errors = response.data.errors
            }
        })
    };

}]);