angular.module('spotyGame').controller('homeController', ["$scope" ,"Spotify", "$location" ,"GameFactory",function ($scope, Spotify, $location, GameFactory) {

    $scope.games = [];

    $scope.login = function () {
        Spotify.login().then(function (data) {
            console.log("You are now logged in");
            $location.url('/play');
        }, function () {
            console.log('didn\'t log in');
        })
    };

    var getGames = function(){
        GameFactory.allGames().then(function(response){
            $scope.games = response.data;
            console.log($scope.games);
        },function(error){
            console.log(error)
        });
    }
    getGames();
}]);