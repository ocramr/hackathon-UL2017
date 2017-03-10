angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$location" ,function ($scope, Spotify) {

    var getSongs = function() {

        $getRandomOffset = Math.floor((Math.random() * 1000) + 1);
        $options = {
            'limit' : '10',
            'offset' : $getRandomOffset
        };
        Spotify.search('genre:pop', 'track', $options).then(function (response) {
            $scope.songs = response.data.tracks.items;
        });
    };

    var initGame = function () {
        Spotify.getCategories({}).then(function (response) {
            $scope.categories = response.data.categories.items;
        });

        getSongs();
    };

    initGame();
}]);