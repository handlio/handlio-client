(function (angular) {

    'use strict';

    var module = angular.module('handlio.client');

    _config.$inject = ['$routeProvider'];
    module.config(_config);

    function _config($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/main' });
    }

})(angular);
