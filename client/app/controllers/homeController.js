angular.module('spotyGame').controller('homeController', ["$scope" ,"Spotify", "$location", "$routeParams", "GameFactory", function ($scope, Spotify, $location, $routeParams, GameFactory) {

    var getGames = function(){
        GameFactory.allGames().then(function(response){
            $scope.games = response.data;
            console.log($scope.games);
        },function(error){
            console.log(error)
        });
    };

    if($routeParams.gameId){
        $location.url('/play/'+$routeParams.gameId);
    }else{
        getGames();
    }

    $scope.login = function () {

        Spotify.login().then(function (data) {

                $location.url('/play');

        }, function () {
            console.log('didn\'t log in');
        })
    };



}]);