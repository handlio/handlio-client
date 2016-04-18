(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.hosts');

    _hostController.$inject = ['$log', 'HostStore'];
    module.controller('HostsController', _hostController);

    function _hostController($log, HostStore) {
        var defaults = { host: { url: '', name: '' } };

        var vm = this;

        vm.hosts = HostStore.get('list') || [];

        vm.new = angular.copy(defaults.host);
        vm.model = {
            keys: '',
            selected: HostStore.get('selected') || vm.hosts[0] || null
        };

        (!!vm.model.selected) && (vm.model.selectedUrl = vm.model.selected.url);

        vm.addHost = _addHost;
        vm.saveSelected = _saveSelected;
        vm.removeHost = _removeHost;

        // private functions

        function _addHost(host) {
            var newHost = {
                url: host.url, name: host.name,
                createdAt: _toTicks(new Date())
            };
            vm.hosts.push(newHost);
            HostStore.set('list', vm.hosts);
            $log.info("Added new host - ", newHost.url + ", " + newHost.name);
            
            vm.new = angular.copy(defaults.host);
            
            vm.model.selected = newHost;
            vm.model.selectedUrl = newHost.url;
            HostStore.set('selected', {
                url: newHost.url, name: newHost.name,
                createdAt: newHost.createdAt
            });
        }

        function _saveSelected(host) {
            HostStore.set('selected', host);
            $log.info("Switched to another host - ", host.url + ", " + host.name);
        }

        function _removeHost(host, index) {
            vm.hosts.splice(index, 1);
            HostStore.set('list', vm.hosts);
            $log.info("Host was removed - ", host.url + ", " + host.name);
        }

        // todo: sorting does not work
        /*
         * There are 621355968000000000 epoch ticks for javascript
         * from Ist Jan 1900 to Ist Jan 1970.
         * And here 10000 are the ticks per milliseconds.*/
        function _toTicks(date) {
            return (date.getTime() * 10000) + 621355968000000000;
        }
    }

})(angular);