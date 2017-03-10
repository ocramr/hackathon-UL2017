angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$location" ,function ($scope, Spotify) {

    $scope.position = 0;
    $scope.songs= [];
    $scope.choices= [];
    $scope.isPlaying = false;

    var getSongs = function(category) {

        $getRandomOffset = Math.floor((Math.random() * 1000) + 1);
        $options = {
            'limit' : '10',
            'offset' : $getRandomOffset
        };
        Spotify.search('genre:'+category, 'track', $options).then(function (response) {
            $scope.songs = response.data.tracks.items;
            $scope.song = $scope.songs[$scope.position];    
        });
    };


    var initGame = function () {
        Spotify.getCategories({}).then(function (response) {
            $scope.categories = response.data.categories.items;
        });

        
    };

    $scope.selectCategory = function (category) {
      $scope.isPlaying = true;
      getSongs('pop');
      getchoices('pop');
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
    initGame();
}]);