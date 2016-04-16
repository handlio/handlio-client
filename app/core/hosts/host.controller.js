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
        vm.model = { keys: '' };

        vm.model.selected = HostStore.get('selected') || vm.hosts[0] || null;
        if (!!vm.model.selected) {
            vm.model.selectedUrl = vm.model.selected.url;
        }

        vm.addHost = function (host) {
            var newHost = {
                url: host.url, name: host.name,
                createdAt: _toTicks(new Date())
            };
            vm.hosts.push(newHost);
            HostStore.set('list', vm.hosts);
            vm.new = angular.copy(defaults.host);
            vm.model.selected = newHost;
            vm.model.selectedUrl = newHost.url;
            HostStore.set('selected', {
                url: newHost.url, name: newHost.name,
                createdAt: newHost.createdAt
            });
            $log.info("Added new host - ", newHost.url + ", " + newHost.name);
        };

        vm.saveSelected = function (host) {
            HostStore.set('selected', host);
            $log.info("Switched to another host - ", host.url + ", " + host.name);
        };

        vm.removeHost = function (host, index) {
            vm.hosts.splice(index, 1);
            HostStore.set('list', vm.hosts);
            $log.info("Host was removed - ", host.url + ", " + host.name);
        };

        // todo: sorting does not work
        /*
         * There are 621355968000000000 epoch ticks for javascript
         * from Ist Jan 1900 to Ist Jan 1970.
         * And here 10000 are the ticks per milliseconds.*/
        function _toTicks(date) {
            return (date.getTime() * 10000) + 621355968000000000;
        }

        // todo: move to manual command sender.
        // var options = {
        //     api: {
        //         route: 'api/handle'
        //     }
        // };
        
        // vm.send = function (keys) {
        //     var url = 'http://' + vm.model.selectedUrl + '/' + options.api.route;
        //
        //     $http.post(url, { keys: keys }, { cache: false }).then(function (res) {
        //         $log.debug('Success: ', res);
        //     }, function (err) {
        //         $log.debug('Failed: ', err);
        //     });
        // };
    }

})(angular);