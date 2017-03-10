var app = angular.module('spotyGame', ['spotify', 'ngRoute']);

app.config(function($routeProvider, $locationProvider, $logProvider, SpotifyProvider){
    $routeProvider
        .when('/', {
            templateUrl: '../assets/templates/play.html',
            controller: 'gameController'
        })
        .when('/play', {
            templateUrl: '../assets/templates/game.html',
            controller: 'gameController'
        }).otherwise({redirectTo: '/sdsd'}
    );

    $logProvider.debugEnabled(true);
  SpotifyProvider.setClientId('e3cd640ff09c48789ea6708e8187cee0');
  SpotifyProvider.setRedirectUri('http://spotyplay.local/play');
  SpotifyProvider.setScope('playlist-read-private');
});
    
