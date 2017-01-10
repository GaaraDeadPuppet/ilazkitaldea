angular
    .module('comicsApp')
    .factory('Comics', function($http) {
        var dataSource = 'http://samcroft.co.uk/comics-app/comics?callback=JSON_CALLBACK';

        //http://www.ilazkitaldea.com/app/php/descripcion_actividades.php
        //http://samcroft.co.uk/comics-app/comics?callback=JSON_CALLBACK

        return {
            getComics: function() {
                return $http.jsonp(dataSource);
            },
            getComic: function(comicId) {
                return $http.jsonp(dataSource, {
                    params: {
                        id: comicId
                    }
                });
            }
        }
    });