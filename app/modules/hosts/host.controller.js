(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.hosts');

    _hostController.$inject = ['$log', 'HostStore'];
    module.controller('HostsController', _hostController);

    function _hostController($log, HostStore) {
        var defaults = { host: _defaultHost };

        var vm = this;

        vm.list = HostStore.get('list') || [];

        vm.new = angular.copy(defaults.host);
        vm.model = {
            keys: '',
            selected: HostStore.get('selected') || vm.list[0] || null
        };

        (!!vm.model.selected) && (vm.model.selectedUrl = vm.model.selected.url);

        vm.addHost = _addHost;
        vm.saveSelected = _saveSelected;
        vm.removeHost = _removeHost;

        // private functions

        function _addHost(host) {
            var newHost = { url: host.url, name: host.name };
            vm.list.push(newHost);
            HostStore.set('list', vm.list);
            $log.info("Added new host - ", newHost.url + ", " + newHost.name);

            vm.new = defaults.host();
            
            vm.model.selected = newHost;
            vm.model.selectedUrl = newHost.url;

            _saveSelected(newHost);
        }

        function _saveSelected(host) {
            HostStore.set('selected', host);
            $log.info("Switched to another host - ", host.url + ", " + host.name);
        }

        function _removeHost(host, index) {
            vm.list.splice(index, 1);
            HostStore.set('list', vm.list);
            $log.info("Host was removed - ", host.url + ", " + host.name);
        }

        function _defaultHost() {
            return { url: '', name: '' };
        }
    }

})(angular);