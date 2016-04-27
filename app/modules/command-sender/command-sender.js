(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.command-sender');

    _directive.$inject = [];
    module.directive('commandSender', _directive);

    function _directive() {
        return {
            templateUrl: 'modules/command-sender/command-sender.html'
        };
    }

})(angular);