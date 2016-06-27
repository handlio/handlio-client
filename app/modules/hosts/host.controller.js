(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.hosts');

    _hostController.$inject = ['$log', 'HostStore', 'HostState'];
    module.controller('HostsController', _hostController);

    function _hostController($log, HostStore, HostState) {
        var defaults = { host: _defaultHost };

        var vm = this;

        vm.list = HostStore.get('list') || [];

        vm.new = defaults.host();
        vm.model = {};

        vm.model.selected = HostStore.get('selected') || vm.list[0] || null;
        if (vm.model.selected) {
            HostState.change(vm.model.selected);
            vm.model.selectedUrl = vm.model.selected.url;
        }

        vm.addHost = _addHost;
        vm.saveSelected = _saveSelectedHostToStore;
        vm.removeHost = _removeHost;

        // private functions

        function _addHost(host) {
            var newHost = { url: host.url, name: host.name };
            vm.list.push(newHost);
            HostStore.set('list', vm.list);
            $log.info("Added new host - ", newHost.url + ", " + newHost.name);

            vm.new = defaults.host();

            _setSelected(newHost);
        }

        function _setSelected(host) {
            vm.model.selected = host;
            vm.model.selectedUrl = host ? host.url : '';

            _saveSelectedHostToStore(host);
        }

        function _saveSelectedHostToStore(host) {
            if (host) {
                HostStore.set('selected', host);
                HostState.change(host);
            }
            else {
                HostStore.remove('selected');
                HostState.change(null);
            }
        }

        function _removeHost(host, index) {
            var shouldResetSelected = vm.list.indexOf(vm.model.selected) === index;
            vm.list.splice(index, 1);
            HostStore.set('list', vm.list);

            if (shouldResetSelected) {
                _setSelected(vm.list[0] || null);
            }

            $log.info("Host was removed - ", host.url + ", " + host.name);
        }

        function _defaultHost() {
            return { url: '', name: '' };
        }
    }

})(angular);