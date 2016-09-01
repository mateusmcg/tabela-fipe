'use strict';

var app = angular.module('app', ['ui.bootstrap']);

app.constant('baseApiUrl', 'http://fipeapi.appspot.com/api/1/');

app.config([function () {

}]);

app.run([function () {

}]);

app.controller('mainCtrl', ['$log', 'baseApiUrl', '$http', function ($log, baseApiUrl, $http) {
    $log.debug('Running main controller');

    var vm = this;
    vm.marcas = [];
    
    getMarcas();

    function getMarcas() {
        $http.get(baseApiUrl + 'carros/marcas.json').then(function (result) {
            vm.marcas = result.data.map(function (marca) { return marca.fipe_name });
        })
    }
}])