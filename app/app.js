(function (angular) {

    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('handlio.client', [
        'ngRoute',
        'handlio.client.configurator',
        'handlio.client.hosts',
        'handlio.client.components',
        'angular-storage'
    ]).config(['$routeProvider', function ($routeProvider) {

        $routeProvider.otherwise({ redirectTo: '/main' });

    }]);

})(angular);
