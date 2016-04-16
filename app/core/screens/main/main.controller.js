(function (angular) {

    'use strict';

    var module = angular.module('handlio.client.screens');

    _controller.$inject = ['store', 'ConfigState'];
    module.controller('MainController', _controller);

    function _controller(store, ConfigState) {
        var vm = this;

        var configState = store.get('config:state');
        vm.showConfigurator = configState === null ? false : configState === ConfigState.shown;

        vm.toggleConfig = _toggleConfig;

        // private functions

        function _toggleConfig(configVisibility) {
            vm.showConfigurator = !configVisibility;
            store.set('config:state', vm.showConfigurator ? ConfigState.shown : ConfigState.hidden);
        }
    }

})(angular);