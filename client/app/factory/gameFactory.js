angular.module('spotyGame').factory('GameFactory', ['BACKEND_URL','$http',function (API_URL, $http) {

    return {
        startGame:function (json) {
            return $http.post(API_URL+'game/play', json);
        },
        
        finishGame:function(json) {
            return $http.post(API_URL+'game/finish', json);
        }
    }

}]);