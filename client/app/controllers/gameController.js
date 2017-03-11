angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$sce", "GameFactory", "Song", function ($scope, Spotify, $sce, GameFactory, Song) {

    $scope.position = 0;
    $scope.songs= [];
    $scope.choices= [];
    $scope.isPlaying = false;
    $scope.score = 0;

    var getSongs = function(category) {
        $getRandomOffset = Math.floor((Math.random() * 1000) + 1);
        $options = {
            'limit' : '10',
            'offset' : $getRandomOffset
        };
        Spotify.search('genre:'+category, 'track', $options).then(function (response) {
            $scope.songs = response.data.tracks.items;
            createGame();
        });
    };

    var createGame = function()
    {
        $scope.song = $scope.songs[$scope.position];
        $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify%3Atrack%3A"+$scope.song.id);
        saveGame();

    }

    var saveGame = function () {
        var songsToSend = [];
        $scope.songs.forEach(function (e) {
            songsToSend.push(new Song(e));
        });
        GameFactory.startGame({
            "gameName": "Jeu",
            "userName": $scope.currentUser.displayName || $scope.currentUser.id,
            "owner": $scope.currentUser.id,
            "songs": songsToSend
        }).then(function (response) {
            console.log(response.data);
            $scope.playUri = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify%3Atrack%3A"+$scope.song.id);
            getchoices('pop');

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
                console.log(response.data)
            });

        });
    };

    $scope.selectCategory = function (category) {
      getSongs('pop');
      getchoices('pop');
    };

    var getchoices = function(category)
    {
        $getRandomOffset = Math.floor((Math.random() * 1000) + 1);
        $options = {
            'limit' : '3',
            'offset' : $getRandomOffset
        };
        Spotify.search('genre:'+category, 'track', $options).then(function (response) {
            $scope.isPlaying = true;
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

    $scope.finishGame = function(id){
        GameFactory.finishGame({
            id_game : id,
            score : $scope.score
        }).then(function(response){
            console.log(response)
        }, function(error){
            console.log(error);
        })
    }

    initGame();
}]);