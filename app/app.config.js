(function (angular) {
    'use strict';

    var module = angular.module('handlio.client');

    _config.$inject = ['$routeProvider'];
    module.config(_config);

    _run.$inject = ['$rootScope'];
    module.run(_run);

    function _config($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/main' });
    }

    function _run($root, $routeParams) {
        $root.$routeParams = $routeParams;
    }

})(angular);
