angular.module('spotyGame').directive('choices', [
    function(){
        return{
            restrict : 'E',
            templateUrl : 'app/templates/choices.html'
        };
    }
]);