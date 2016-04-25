(function (angular) {
    'use strict';

    angular.module('handlio.client', [
        'ngRoute',
        'handlio.client.core',
        'handlio.client.configurator',
        'handlio.client.hosts',
        'handlio.client.components',
        'handlio.client.screens',
        'handlio.client.command-sender'
    ]);

    _run.$inject = ['$rootScope'];
    angular.module('handlio.client').run(_run);
    
    function _run($root, $routeParams) {
        $root.$routeParams = $routeParams;
    }

})(angular);
