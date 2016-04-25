(function (angular) {
    'use strict';

    angular.module('handlio.client', [
        'ngRoute',
        'handlio.client.configurator',
        'handlio.client.hosts',
        'handlio.client.components',
        'handlio.client.screens',
        'handlio.client.commands'
    ]);

})(angular);
