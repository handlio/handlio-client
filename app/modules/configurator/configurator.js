(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.configurator');

    _directive.$inject = [];
    module.directive('configurator', _directive);

    function _directive() {
        return {
            templateUrl: 'modules/configurator/configurator.html',
            controller: 'ConfiguratorController as configurator'
        };
    }

})(angular);