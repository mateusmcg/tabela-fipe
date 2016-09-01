'use strict';

var app = angular.module('app', ['ui.bootstrap']);

app.constant('marcasUrl', 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas');
app.constant('modelosUrl', 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas/{marca}/modelos');
app.constant('anosUrl', 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas/{marca}/modelos/{modelo}/anos');
app.constant('valorUrl', 'https://fipe-parallelum.rhcloud.com/api/v1/carros/marcas/{marca}/modelos/{modelo}/anos/{ano}');

app.config([function () {

}]);

app.run([function () {

}]);

app.controller('mainCtrl', ['$log', 'marcasUrl', 'modelosUrl', 'anosUrl', 'valorUrl', '$http', function ($log, marcasUrl, modelosUrl, anosUrl, valorUrl, $http) {
    $log.debug('Running main controller');

    var vm = this;
    
    vm.brandSelected = brandSelected;
    vm.modelSelected = modelSelected;
    vm.yearSelected = yearSelected;
    
    vm.marcas = [];
    
    getMarcas();

    function getMarcas() {
        vm.loadingBrands = true;
        $http.get(marcasUrl).then(function (result) {
            vm.marcas = result.data;
            vm.loadingBrands = false;
        })
    }
    
    function brandSelected($item, $model, $label, $event){
        vm.selectedBrandObj = $item;
        vm.loadingModels = true;
        vm.selectedModel = undefined;
        vm.selectedYear = undefined;
        vm.preco = undefined;
        $http.get(modelosUrl.replace('{marca}', $item.codigo)).then(function (result) {
            vm.modelos = result.data.modelos;
            vm.loadingModels = false;
        })
    }
    
    function modelSelected($item, $model, $label, $event){
        vm.selectedModelObj = $item;
        vm.loadingYears = true;
        vm.selectedYear = undefined;
        vm.preco = undefined;
        $http.get(anosUrl.replace('{marca}', vm.selectedBrandObj.codigo).replace('{modelo}', $item.codigo)).then(function (result) {
            vm.anos = result.data;
            vm.loadingYears = false;
        })
    }
    
    function yearSelected($item, $model, $label, $event){
        vm.loadingPrice = true;
        vm.loadingCalculatedPrice = true;
        $http.get(valorUrl.replace('{marca}', vm.selectedBrandObj.codigo).replace('{modelo}', vm.selectedModelObj.codigo).replace('{ano}', $item.codigo)).then(function (result) {
            vm.preco = result.data;
            vm.loadingPrice = false;
            vm.loadingCalculatedPrice = false;
        })
    }
}])