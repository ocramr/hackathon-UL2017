angular.module('spotyGame').controller('homeController', ["$scope" ,"Spotify", "$location" ,function ($scope, Spotify, $location) {

    $scope.login = function () {
        Spotify.login().then(function (data) {
            console.log("You are now logged in");
            $location.url('/#!/play');
        }, function () {
            console.log('didn\'t log in');
        })
    };

}]);