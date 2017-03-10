angular.module('spotyGame').directive('categories', [
    function(){
        return{
            restrict : 'E',
            templateUrl : 'app/templates/categories.html'
        };
    }
]);