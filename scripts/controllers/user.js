myApp.controller('user', ['$scope', 'sessionService', function($scope, sessionService) {
    sessionService.shouldUserBeRerouted();
    $scope.email = sessionStorage.email;

    $scope.user = {
        token: sessionStorage.auth,
        id: sessionStorage.id,
        email: sessionStorage.email,
        passwordConfirmation: '',
        password: ''
    };

    $scope.editFormStatus = false;

    $scope.showEdit = function() {
        $scope.editFormStatus = !$scope.editFormStatus;
    };

    $scope.submit = function() {

    };

    function isLongEnough(pwd) {
        return pwd.length > 7;
    };

    function hasNumbers(pwd) {
        return /[0-9]/.test(pwd);
    };

    function hasMatchingPassword(pwd1, pwd2) {
        if (pwd1 === pwd2) {
            return true;
        } else {
            false;
        }
    }

    function isEmailValid(email){
    	return !/^\S+@\S+\.\S+$/.test(email);
    }

    $scope.$watch('user.email', function(newValue, oldValue) {
        if (!newValue) return;

        $scope.reqs = [];

        if (isEmailValid(newValue)) {
        	$scope.reqs.push('Must be valid email');
        }

        $scope.showReqs = $scope.reqs.length;
    });

    $scope.$watch('user.password', function(newValue, oldValue) {

        if (!newValue) return;
        $scope.reqs = [];

        if (!isLongEnough(newValue)) {
            $scope.reqs.push('Password is too short');
        }

        if (!hasNumbers(newValue)) {
            $scope.reqs.push('Password must contain number!');
        }

        $scope.showReqs = $scope.reqs.length;

    });

    $scope.$watch('user.passwordConfirmation', function(newValue, oldValue) {
        if (!newValue) return;

        $scope.reqs = [];

        if (!isLongEnough(newValue)){
        	$scope.reqs.push('Password confirmation is too short');
        }

        if (!hasNumbers(newValue)){
        	$scope.reqs.push('Password confirmation does NOT have numbers');
        }

        if (!hasMatchingPassword(newValue, $scope.user.password)) {
            $scope.reqs.push('Passwords do NOT match');
        };

        console.log($scope.reqs);

        $scope.showReqs = $scope.reqs.length;

    })

}]);