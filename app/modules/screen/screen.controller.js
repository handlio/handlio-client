(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screen');

    _controller.$inject = ['store', 'VisibilityState', 'PluginTracker'];
    module.controller('ScreenController', _controller);

    function _controller(store, VisibilityState, PluginTracker) {
        var vm = this;

        vm.panels = {
            'configurator': { name: 'configurator', storeKey: 'config:state', visible: '' },
            'command-sender': { name: 'command-sender', storeKey: 'command-sender:state', visible: '' }
        };

        for (var panelName in vm.panels) {
            if (vm.panels.hasOwnProperty(panelName)) {
                var panelDefinition = vm.panels[panelName];
                var state = store.get(panelDefinition.storeKey);
                panelDefinition.visible = state === null ? false : state === VisibilityState.shown;
            }
        }

        vm.plugins = PluginTracker.getPlugins();

        vm.toggleConfig = _toggleVisibility.bind(null, 'configurator');
        vm.toggleCommandSender = _toggleVisibility.bind(null, 'command-sender');

        // private functions

        function _toggleVisibility(panelName, visible) {
            var panelDefinition = vm.panels[panelName];
            panelDefinition.visible = !visible;
            store.set(panelDefinition.storeKey, panelDefinition.visible ? VisibilityState.shown : VisibilityState.hidden);
        }
    }

})(angular);