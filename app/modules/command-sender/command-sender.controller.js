(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.command-sender');

    _commandSenderController.$inject = ['$log'];
    module.controller('CommandSenderController', _commandSenderController);

    function _commandSenderController($log) {
        var vm = this;

        vm.command = {
            keys: '',
            window: '[ACTIVE]' // todo: sync in local storage
        };

        // private functions

    }

})(angular);
