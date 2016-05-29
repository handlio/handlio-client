(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.core');

    _service.$inject = ['$log'];
    module.service('HostState', _service);

    function _service($log) {
        var state = {
            host: null
        };

        this.change = _change;
        this.get = _get;

        // private functions

        function _change(host) {
            state.host = host;
            $log.info('Host has been changed to ', JSON.stringify(host));
        }

        function _get() {
            return state.host;
        }
    }

})(angular);