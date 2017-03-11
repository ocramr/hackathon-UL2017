angular.module('spotyGame').controller('homeController', ["$scope" ,"Spotify", "$location", "$routeParams", "GameFactory", function ($scope, Spotify, $location, $routeParams, GameFactory) {

    $scope.login = function () {
        Spotify.login().then(function (data) {
            console.log("You are now logged in");
            if($routeParams.gameId){
                $location.url('/play/'+$routeParams.gameId);
            }else{
                $location.url('/play');
            }
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
    };
    getGames();
}]);