(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.configurator');

    _config.$inject = ['$routeProvider'];
    module.config(_config);

    function _config($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        });
    }

})(angular);