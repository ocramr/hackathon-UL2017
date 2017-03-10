angular.module('spotyGame').controller('gameController', ["$scope" ,"Spotify" ,function ($scope, Spotify) {
    Spotify.getCategories({ country: 'SG' }).then(function (data) {
        $scope.cats = data;
    });
}]);