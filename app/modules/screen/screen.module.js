(function (angular) {
    'use strict';

    angular.module('handlio.client.screen', [
        'ui.router',
        'angular-storage',
        'handlio.client.core',
        'handlio.client.configurator',
        'handlio.client.command-sender'
    ]);

})(angular);