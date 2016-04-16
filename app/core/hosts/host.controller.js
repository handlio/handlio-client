(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.hosts');

    _hostController.$inject = ['$http', '$log', 'HostStore'];
    module.controller('MainCtrl', _hostController);

    function _hostController($http, $log, HostStore) {
        var defaults = { host: { url: '', name: '' } };

        var ctrl = this;
        var options = {
            api: {
                route: 'api/handle'
            }
        };

        ctrl.hosts = HostStore.get('list') || [];

        ctrl.new = angular.copy(defaults.host);
        ctrl.model = { keys: '' };

        ctrl.model.selected = HostStore.get('selected') || ctrl.hosts[0] || null;
        if (!!ctrl.model.selected) {
            ctrl.model.selectedUrl = ctrl.model.selected.url;
        }

        ctrl.addHost = function (host) {
            var newHost = {
                url: host.url, name: host.name,
                createdAt: _toTicks(new Date())
            };
            ctrl.hosts.push(newHost);
            HostStore.set('list', ctrl.hosts);
            ctrl.new = angular.copy(defaults.host);
            ctrl.model.selected = newHost;
            ctrl.model.selectedUrl = newHost.url;
            HostStore.set('selected', {
                url: newHost.url, name: newHost.name,
                createdAt: newHost.createdAt
            });
        };

        ctrl.saveSelected = function (host) {
            HostStore.set('selected', host);
        };

        ctrl.removeHost = function (host, index) {
            ctrl.hosts.splice(index, 1);
            HostStore.set('list', ctrl.hosts);
        };

        ctrl.send = function (keys) {
            var url = 'http://' + ctrl.model.selectedUrl + '/' + options.api.route;

            $http.post(url, { keys: keys }, { cache: false }).then(function (res) {
                $log.debug('Success: ', res);
            }, function (err) {
                $log.debug('Failed: ', err);
            });
        };

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