var app = angular.module('spotyGame', ['spotify', 'ngRoute', 'ngAnimate', '720kb.socialshare','timer']);
app.constant('BACKEND_URL', 'http://backend.spotyplay.local/');

app.config(function($routeProvider, $locationProvider, $logProvider, SpotifyProvider){
    $routeProvider
        .when('/', {
            templateUrl: '../assets/templates/play.html',
            controller: 'homeController'
        })
        .when('/#!/scores', {
            templateUrl: '../assets/templates/finish.html',
            controller: 'gameController'
        })
        .when('/scores', {
            templateUrl: '../assets/templates/finish.html',
            controller: 'gameController'
        })
        .when('/#!/play', {
            templateUrl: '../assets/templates/game.html',
            controller: 'gameController'
        })
        .when('/play', {
            templateUrl: '../assets/templates/game.html',
            controller: 'gameController'
    }).otherwise({redirectTo: '/'}
    );

    $locationProvider.html5Mode(true);

    $logProvider.debugEnabled(true);
    SpotifyProvider.setClientId('e3cd640ff09c48789ea6708e8187cee0');
    SpotifyProvider.setRedirectUri('http://spotyplay.local/#!/play');
    SpotifyProvider.setScope('playlist-read-private');
});
    
