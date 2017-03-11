angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$sce", "GameFactory", "Song", "$location", function ($scope, Spotify, $sce, GameFactory, Song, $location) {

    $scope.position = 0;
    $scope.songs= [];
    $scope.choices= [];
    $scope.isPlaying = false;
    $scope.score = 0;
    $scope.game = {};

    var getSongs = function(category) {
         $getRandomOffset = Math.floor((Math.random() * 10) + 1);
         
         Spotify.getCategoryPlaylists(category, {limit :'1'}).then(function(response){
             Spotify.getPlaylistTracks(response.data.playlists.items[0].owner.id, response.data.playlists.items[0].id, 
                                         {'limit':'10', offset:$getRandomOffset})
             .then(function(response){
                 $scope.songs = response.data.items
                 loadNewSong()
                 getChoices(category);
             })
          });
    };

    var loadNewSong = function()
    {
        $scope.song = $scope.songs[$scope.position];
        $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify%3Atrack%3A"+$scope.song.track.id);
    };

    var createGame = function () {
        var songsToSend = [];
        $scope.songs.forEach(function (e) {
            songsToSend.push(new Song(e));
        });
         $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify%3Atrack%3A"+$scope.song.track.id);
            $scope.isPlaying = true;
        GameFactory.startGame({
            "gameName": "Jeu",
            "userName": $scope.currentUser.displayName || $scope.currentUser.id,
            "owner": $scope.currentUser.id,
            "songs": songsToSend
        }).then(function (response) {
            console.log(response.data);
            $scope.game = response.data;
            $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify%3Atrack%3A"+$scope.song.id);
            $scope.isPlaying = true;
        }, function (error) {
            console.log(error);
        });  
    };

    var initGame = function () {
   
        Spotify.getCurrentUser().then(function (response) {
            $scope.currentUser = response.data;
            $scope.currentUserUri = $sce.trustAsResourceUrl("https://embed.spotify.com/follow/1/?uri=spotify%3Auser%3A"+$scope.currentUser.id+"&size=detail&theme=dark");
            Spotify.getCategories({}).then(function (response) {
                $scope.categories = response.data.categories.items;
            });

        });
    };

    $scope.selectCategory = function (category) {
      getSongs(category.id);
    };

    var getChoices = function(category)
    {
        $getRandomOffset = Math.floor((Math.random() * 10) + 1);
        $options = {
            'limit' : '3',
            'offset' : $getRandomOffset
        };
        Spotify.search('genre:'+category, 'track', $options).then(function (response) {
          
            $scope.choices = response.data.tracks.items;
            $scope.choices.push($scope.song.track);
            $scope.choices.sort(function(a, b){return 0.5 - Math.random()});
            createGame();
        });
    };

    $scope.checkChoice = function(id)
    {
        $scope.position = $scope.position+1;
        if($scope.position < $scope.songs.length){
            if($scope.song.id == id)
            {
                $scope.score = $scope.score + 1;
            }
            loadNewSong();
        }else{
            $scope.finish();
        }

    };

    $scope.finish = function(){
        GameFactory.finishGame({game : $scope.game.id,  score : $scope.score})
        .then(function(response){
            console.log(response);
            $location.url('/score');
        },function(error){
            console.log(error);
        });
    }

    initGame();
}]);

