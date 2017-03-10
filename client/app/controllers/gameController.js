angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify" ,function ($scope, Spotify) {

    $scope.login = function () {
        Spotify.login().then(function (data) {
            console.log(data);
            alert("You are now logged in");
        }, function () {
            console.log('didn\'t log in');
        })
    };
}]);