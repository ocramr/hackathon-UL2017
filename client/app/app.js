var app = angular.module('spotyGame', ['spotify']);

app.config(function($logProvider, SpotifyProvider){
  $logProvider.debugEnabled(true);
  SpotifyProvider.setClientId('e3cd640ff09c48789ea6708e8187cee0');
  SpotifyProvider.setRedirectUri('http://spotyplay.local/play');
  SpotifyProvider.setScope('playlist-read-private');
});
    
