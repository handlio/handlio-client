(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.core');

    _service.$inject = ['$http', '$log', '$q', 'HostState', 'notification'];
    module.service('CommandService', _service);

    function _service($http, $log, $q, HostState, notification) {
        var options = { api: { route: 'api/handle' } };

        this.send = _send;

        function _send(keys, windowName) {
            var selectedHost = HostState.get();

            if (!selectedHost) {
                notification.error('Host is not specified.', 'Configuration Error');
                return $q.when();
            }

            var selectedUrl = selectedHost.url;

            var url = 'http://' + selectedUrl + '/' + options.api.route;
            windowName = windowName || '[ACTIVE]';
            
            return $http.post(url, { keys: keys, window: windowName }, { cache: false }).then(function (res) {
                $log.debug('Success: ', res);
            }, function (err) {
                notification.error('Failed: ' + err, 'Server Error');
            });
        }
    }

})(angular);