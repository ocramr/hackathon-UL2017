angular.module('spotyGame').controller('gameController', ["$scope", "$http", "Spotify", "$location",function ($scope, $http, Spotify) {

    $scope.position = 0;
    $scope.songs= [];
    $scope.isPlaying = false;

    var getSongs = function(category) {
        
        $getRandomOffset = Math.floor((Math.random() * 10) + 1);
        
        Spotify.getCategoryPlaylists(category, {limit :'1'}).then(function(response){
            Spotify.getPlaylistTracks(response.data.playlists.items[0].owner.id, response.data.playlists.items[0].id, 
                                        {'limit':'10', offset:$getRandomOffset})
            .then(function(response){
                $scope.songs = response.data.items
                $scope.song = $scope.songs[$scope.position]; 
            })
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
      console.log(category)
      getSongs(category.id);
    };

    initGame();
}]);