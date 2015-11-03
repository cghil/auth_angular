myApp.factory("flash", ['$rootScope', function($rootScope){
	var queue = [];
	var currentMessage = "";

	$rootScope.$on("$routeChnageSuccess", function(){
		currentMessage = queue.shift() || "";
	});

	return {
		setMessage: function(message){
			queue.push(message);
		},
		getMessage: function(){
			return currentMessage;
		}
	};

}]);