/**
 * Created by marco on 10/03/17.
 */
angular.module('spotyGame').service('Song', [function(){

    function Song(data){
        this.id = data.id;
        this.name = data.name;
        this.preview_url = data.preview_url;
        this.uri = data.uri;
    }
    return Song;
}
]);