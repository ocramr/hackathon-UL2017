angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$sce", "GameFactory", "Song",  function ($scope, Spotify, $sce, GameFactory, Song) {

    $scope.position = 0;
    $scope.songs= [];
    $scope.choices= [];
    $scope.isPlaying = false;
    $scope.score = 0;
    $scope.game = {};
    $scope.player = {};
    var categoryId;

    var getSongs = function(category) {
        var $getRandomOffset = Math.floor((Math.random() * 10) + 1);

        Spotify.getCategoryPlaylists(category, {limit :'1'}).then(function(response){
            Spotify.getPlaylistTracks(response.data.playlists.items[0].owner.id, response.data.playlists.items[0].id,
                {'limit':'13', offset:$getRandomOffset})
                .then(function(response){
                    $scope.songs = response.data.items.slice(0,10);
                    loadNewSong();
                    $scope.choices = response.data.items.slice(10,13);
                    $scope.choices.push($scope.song);
                    createGame();
                })
        });
    };

    var loadNewSong = function()
    {
        $scope.song = $scope.songs[$scope.position];
        console.log($scope.song);
        $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:"+$scope.song.track.id);
    };

    var createGame = function () {
        var songsToSend = [];
        $scope.songs.forEach(function (e) {
            songsToSend.push(new Song(e.track));
        });
        console.log("yo send");
        console.log(songsToSend);
        GameFactory.startGame({
            "gameName": "Jeu",
            "userName": $scope.currentUser.displayName || $scope.currentUser.id,
            "owner": $scope.currentUser.id,
            "songs": songsToSend
        }).then(function (response) {
            $scope.game = response.data;
            $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify%3Atrack%3A"+$scope.song.track.id);
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
        categoryId = category.id;
        getSongs(category.id);
    };

   var getChoices = function()
    {
        $getRandomOffset = Math.floor((Math.random() * 10) + 1);
        $options = {
            'limit' : '3',
            'offset' : $getRandomOffset
        };
        Spotify.getCategoryPlaylists(categoryId, {limit :'1'}).then(function(response){
            Spotify.getPlaylistTracks(response.data.playlists.items[0].owner.id, response.data.playlists.items[0].id,
                $options)
                .then(function(response){
                    $scope.choices = response.data.items;
                    $scope.choices.push($scope.song);
                })
        });
        Spotify.search('genre:'+categoryId, 'track', $options).then(function (response) {

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
            getChoices();
        }else{
            $scope.finish();
        }

    };

    $scope.finish = function(){
        GameFactory.finishGame({game : $scope.game.id,  score : $scope.score, player: $scope.game.player.id})
            .then(function(response){
                console.log(response);
            },function(error){
                console.log(error);
            });
    };

    initGame();
}]);