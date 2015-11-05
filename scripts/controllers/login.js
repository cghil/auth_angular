myApp.controller('login', ['$scope', '$log', '$http', 'myConfig', 'sessionService', '$location', function($scope, $log, $http, myConfig, sessionService, $location) {

    $scope.email = '';
    $scope.password = '';
    $scope.messages = false;

    $scope.switchForm = function(){
        $location.path('/signup')
    };

    $scope.submit = function() {

        var user = {
            email: $scope.email,
            password: $scope.password
        };

        $http({
            method: 'POST',
            url: myConfig.backend + '/api/v1/sessions',
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

            sessionService.isLoggedIn = sessionService.isUserAuthorized();

            $location.path('/users/'+id);

        }, function(response) {

            $scope.messages = true;

            if (response.status === 500) {
                $scope.errors = response.statusText;
            } else {
                $scope.errors = response.data.errors || 'Internal Error';
            }
        })
    };

}]);