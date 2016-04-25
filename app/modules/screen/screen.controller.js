(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screen');

    _controller.$inject = ['store', 'ConfigState', 'PluginTracker'];
    module.controller('MainController', _controller);

    function _controller(store, ConfigState, PluginTracker) {
        var vm = this;

        var configState = store.get('config:state');
        vm.showConfigurator = configState === null ? false : configState === ConfigState.shown;
        
        vm.plugins = PluginTracker.getPlugins();
        
        vm.toggleConfig = _toggleConfig;

        // private functions

        function _toggleConfig(configVisibility) {
            vm.showConfigurator = !configVisibility;
            store.set('config:state', vm.showConfigurator ? ConfigState.shown : ConfigState.hidden);
        }
    }

})(angular);