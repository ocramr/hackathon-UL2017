angular.module('spotyGame').controller('gameController', ["$http","$scope" ,"Spotify" ,function ($http,$scope, Spotify) {

    $scope.login = function () {
        Spotify.login().then(function (data) {
            alert("You are now logged in");
        }, function () {
            console.log('didn\'t log in');
        })
    };

}]);