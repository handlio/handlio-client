(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.command-sender');

    _commandSenderController.$inject = ['$log', 'store', '_'];
    module.controller('CommandSenderController', _commandSenderController);

    function _commandSenderController($log, Store, _) {
        var vm = this;

        var storeKeys = {
            window: 'command-sender:window'
        };

        var defaults = { window: '[ACTIVE]' };

        var window = Store.get(storeKeys.window);

        vm.command = {
            keys: '',
            window: window || defaults.window
        };

        if (!window) {
            _saveWindow(vm.command.window);
        }

        vm.saveWindow = _.debounce(_saveWindow, 1500);

        // private functions

        function _saveWindow(value) {
            Store.set(storeKeys.window, value);
            $log.info('New window value was stored for command sender: "' + value + '"');
        }
    }

})(angular);
