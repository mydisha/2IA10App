angular.module('ia10.services', [])

.factory('tampiltugas', function($http) {
    var baseUrl = 'yoururl';
   //var baseUrl = 'http://mirakuru.web.id/2ia10/';
    return {
        getAll: function() {
            return $http.get(baseUrl+'listtugas.php');
        },
        getId: function (idtugas){
            return $http.get(baseUrl+'select_id.php?id='+idtugas);
        },
        create: function (datatugas){
            return $http.post(baseUrl+'insert.php',datatugas,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function (datatugas){
            return $http.post(baseUrl+'update.php',datatugas,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function  (id){
            return $http.get(baseUrl+'delete.php?id='+id);
        }
    };

});
