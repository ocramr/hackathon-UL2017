angular.module('spotyGame').factory('GameFactory', ['BACKEND_URL','$http',function (BACKEND_URL, $http) {

    return {
        startGame: function (json) {
            return $http.post(BACKEND_URL + 'game/play', json);
        },

        finishGame: function (json) {
            return $http.post(BACKEND_URL + 'game/finish', json);
        },

        joinGame: function (id, json) {
            return $http.put(BACKEND_URL + 'game/joinGame/' + id, json);
        },
        allGames: function () {
            return $http.get(BACKEND_URL + 'games');
        }
    }
}]);