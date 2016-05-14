(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.core');

    _service.$inject = ['$http', '$log', 'HostStore'];
    module.service('CommandService', _service);

    function _service($http, $log, HostStore) {
        var options = { api: { route: 'api/handle' } };

        this.send = _send;

        function _send(keys, windowName) {
            var selectedHost = HostStore.get('selected');

            if (!selectedHost) {
                throw new Error('Host is not specified.');
            }

            var selectedUrl = selectedHost.url;

            var url = 'http://' + selectedUrl + '/' + options.api.route;

            return $http.post(url, { keys: keys, window: windowName }, { cache: false }).then(function (res) {
                $log.debug('Success: ', res);
            }, function (err) {
                $log.debug('Failed: ', err);
            });
        }
    }

})(angular);