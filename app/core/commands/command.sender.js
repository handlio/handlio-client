(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.commands');

    _directive.$inject = [];
    module.directive('commandSender', _directive);

    function _directive() {
        return {
            templateUrl: 'core/commands/command.sender.html',
            controller: 'CommandController as commandController'
        };
    }

})(angular);