(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screen');

    _controller.$inject = ['_', 'store', 'VisibilityState', 'PluginTracker'];
    module.controller('ScreenController', _controller);

    function _controller(_, store, VisibilityState, PluginTracker) {
        var vm = this;

        vm.panels = {
            'configurator': { name: 'configurator', storeKey: 'config:state', visible: '' },
            'commandSender': { name: 'command-sender', storeKey: 'command-sender:state', visible: '' }
        };

        for (var panelName in vm.panels) {
            if (vm.panels.hasOwnProperty(panelName)) {
                var panelDefinition = vm.panels[panelName];
                var state = store.get(panelDefinition.storeKey);
                panelDefinition.visible = (!state || state === VisibilityState.hidden) ? false : state === VisibilityState.shown;
            }
        }

        vm.plugins = PluginTracker.getPlugins();
        vm.pluginView = {
            active: _isPluginViewActive,
            makeActive: _makeActive
        };

        vm.toggleConfig = _toggleVisibility.bind(null, 'configurator');
        vm.toggleCommandSender = _toggleVisibility.bind(null, 'commandSender');

        // private functions

        function _toggleVisibility(panelName, visible) {
            var panelDefinition = vm.panels[panelName];
            panelDefinition.visible = !visible;
            store.set(panelDefinition.storeKey, panelDefinition.visible ? VisibilityState.shown : VisibilityState.hidden);
        }

        function _isPluginViewActive() {
            return _.every(vm.panels, { visible: false });
        }

        function _makeActive() {
            _.forEach(vm.panels, function (panel, key) {
                _toggleVisibility(key, true);
            });
        }
    }

})(angular);