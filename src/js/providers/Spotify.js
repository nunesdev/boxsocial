var Spotify = function($scope,$http,Spotify) {

		$scope.user = null;
	  	$scope.isLogged = false;

	  	$scope.login = function () {
		  	Spotify.login();
		}; 

		Spotify.getCurrentUser()
			.then(function (data) {
		  		console.log(data);
		  		$scope.isLogged = true;
		  		$scope.user = data;
			});

		Spotify.following('artist')
			.then(function (data) {
				console.log(data);
			});
}

module.exports = Spotify;