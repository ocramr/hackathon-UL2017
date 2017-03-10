angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$location" ,function ($scope, Spotify, $location) {

    $scope.login = function () {
        Spotify.login().then(function (data) {
            alert("You are now logged in");
            initGame();
        }, function () {
            console.log('didn\'t log in');
        })
    };

    var initGame = function () {
        $location.url('/play');
        Spotify.getCategories({}).then(function (data) {
            console.log(data);
        });
    }

    
}]);