(function (angular) {

    'use strict';

    angular.module('handlio.client', [
        'ngRoute',
        'handlio.client.configurator',
        'handlio.client.hosts',
        'handlio.client.components',
        'angular-storage'
    ]);

})(angular);
