angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$sce",function ($scope, Spotify, $sce) {

    $scope.position = 0;
    $scope.songs= [];
    $scope.isPlaying = false;

    var getSongs = function(category) {

        $getRandomOffset = Math.floor((Math.random() * 1000) + 1);
        $options = {
            'limit' : '10',
            'offset' : $getRandomOffset
        };
        Spotify.search('genre:'+category, 'track', $options).then(function (response) {
            $scope.songs = response.data.tracks.items;
            console.log($scope.songs);
            $scope.song = $scope.songs[$scope.position];
            $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify%3Atrack%3A"+$scope.song.id);
            
        });
    };


    var initGame = function () {
        Spotify.getCategories({}).then(function (response) {
            $scope.categories = response.data.categories.items;
            console.log($scope.categories)
        });

        
    };

    $scope.selectCategory = function (category) {
      $scope.isPlaying = true;
      getSongs(category.id);
    };

    initGame();
}]);