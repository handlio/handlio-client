(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.hosts');

    _directive.$inject = [];
    module.directive('hosts', _directive);

    function _directive() {
        return {
            templateUrl: 'modules/hosts/hosts.html',
            controller: 'HostsController as hostsController'
        };
    }

})(angular);