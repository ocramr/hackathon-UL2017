angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$sce",function ($scope, Spotify, $sce) {


    $scope.position = 0;
    $scope.songs= [];
    $scope.choices= [];
    $scope.isPlaying = false;
    $scope.score = 0;
    

    var getSongs = function(category) {

        $getRandomOffset = Math.floor((Math.random() * 10) + 1);
        
        Spotify.getCategoryPlaylists(category, {limit :'1'}).then(function(response){
            Spotify.getPlaylistTracks(response.data.playlists.items[0].owner.id, response.data.playlists.items[0].id)
            .then(function(response){
                $scope.songs = response.data.items;
                createGame();
            })
        });
    };

    var createGame = function()
    {
        $scope.song = $scope.songs[$scope.position];
        $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify%3Atrack%3A"+$scope.song.id);
        getchoices($scope.category.id)
    }


    var initGame = function () {

        Spotify.getCurrentUser().then(function (response) {
            $scope.currentUser = response.data;
            $scope.currentUserUri = $sce.trustAsResourceUrl("https://embed.spotify.com/follow/1/?uri=spotify%3Auser%3A"+$scope.currentUser.id+"&size=detail&theme=light");
            Spotify.getCategories({}).then(function (response) {
                $scope.categories = response.data.categories.items;
            });
        });
    }
    $scope.selectCategory = function (category) {
        $scope.category = category;
       
      $scope.isPlaying = true;
      getSongs(category.id);
      getchoices(category.id);
    };

    getchoices = function(category)
    {
        $getRandomOffset = Math.floor((Math.random() * 1000) + 1);
        $options = {
            'limit' : '3',
            'offset' : $getRandomOffset
        };
        Spotify.search('genre:'+category, 'track', $options).then(function (response) {
            $scope.choices = response.data.tracks.items;
            $scope.choices.push($scope.song)
        });
    }

    $scope.checkChoice = function(id)
    {
        $scope.position = $scope.position+1;
        createGame();
        if($scope.song.id == id)
        {
            $scope.score = $scope.score + 1;
        }
    }
    initGame();
}]);