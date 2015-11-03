myApp.service('sessionService', ['$log', '$http', 'myConfig', function($log, $http, myConfig){

	this.isUserAuthorized = function(){
		if(sessionStorage.auth === undefined){
			return false
		} else {
			if (sessionStorage.auth.length === 20 && sessionStorage.length === 3 && sessionStorage.hasOwnProperty('auth') && sessionStorage.hasOwnProperty('email') && sessionStorage.hasOwnProperty('id')) {
				return true
			} else {
				return false
			};
		}
	};

	this.isLoggedIn = this.isUserAuthorized() || false;

	var thatService = this;

	this.logOutUser = function(){
		$http({
			method: 'DELETE',
			url: myConfig.backend + '/api/v1/sessions/' + sessionStorage.auth
		}).then(function(response){
			sessionStorage.clear();
			$log.log('Session has been cleared and token was changed...')
			thatService.isLoggedIn = false;
		}, function(response){
			sessionStorage.clear();
			$log.log('Session has been cleared but token was not changed...')
			thatService.isLoggedIn = false;
		})
	};

	this.shouldUserBeRerouted = function(){
		if(!isUserAuthorized()){
			$location.path('/')
		}
	};

}]);