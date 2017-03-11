angular.module('spotyGame').factory('GameFactory', ['BACKEND_URL','$http',function (BACKEND_URL, $http) {

    return {
        startGame:function (json) {
            return $http.post(BACKEND_URL+'game/play', json);
        }
    }

}]);