(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.core');

    _service.$inject = ['$http', '$log', '$q', 'HostState', 'notification'];
    module.service('CommandService', _service);

    function _service($http, $log, $q, HostState, notification) {
        var options = {
            api: {
                handle: 'api/handle',
                mouse: {
                    move: 'api/mouse/move'
                }
            }
        };

        this.send = _send;
        this.mouse = {
            move: _mouseMove
        };

        function _send(keys, windowName) {
            var serverUrl = _getServerUrl();
            if (!serverUrl) return $q.when();

            var url = serverUrl + options.api.handle;

            $log.debug('send command: ' + keys);
            windowName = windowName || '[ACTIVE]';

            return $http.post(url, { keys: keys, window: windowName }, { cache: false }).then(function (res) {
                $log.debug('Success: ', res);
            }, function (err) {
                notification.error('Failed: ' + (err.status < 0 ? "Connection refused" : err.statusText), 'Server Error');
            });
        }

        function _mouseMove(orientation, step, times) {
            var serverUrl = _getServerUrl();
            if (!serverUrl) return $q.when();

            if (orientation !== 'vertical' && orientation !== 'horizontal') {
                notification.error('Orientation is not specified.', 'Programming Argument Error');
                return $q.when();
            }

            var url = serverUrl + options.api.mouse.move + '/' + orientation;

            $log.debug("mouse move: orientation=%s, step=%s, times=%s", orientation, step, times);

            return $http.post(url, { step: step, times: times }, { cache: false }).then(function (res) {
                $log.debug('Success: ', res);
            }, function (err) {
                notification.error('Failed: ' + (err.status < 0 ? "Connection refused" : err.statusText), 'Server Error');
            });
        }

        function _getServerUrl() {
            var selectedHost = HostState.get();

            if (!selectedHost) {
                notification.error('Host is not specified.', 'Configuration Error');
                return null;
            }

            var selectedUrl = selectedHost.url;

            return 'http://' + selectedUrl + '/';
        }
    }

})(angular);