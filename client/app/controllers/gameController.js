angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify", "$location" ,function ($scope, Spotify, $location) {

    $scope.login = function () {
        Spotify.login().then(function (data) {
            alert("You are now logged in");
            initGame();
        }, function () {
            console.log('didn\'t log in');
        })
    };

    var initGame = function () {
        $location.url('/play');
        Spotify.getCategories({}).then(function (data) {
            console.log(data);
        });
    }


        var getSongs = function()
        {
            $getRandomOffset = Math.floor((Math.random() * 1000) + 1);
            $options = {
                'limit' : '10',
                'offset' : $getRandomOffset
            }
            Spotify.search('genre:pop', 'track', $options).then(function (data) {
                console.log(data);
            });
        }

        getSongs();
}]);