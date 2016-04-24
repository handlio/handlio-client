(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.commands');

    _controller.$inject = ['$rootScope', '$http', '$log', 'HostStore'];
    module.controller('CommandController', _controller);

    function _controller($rootScope, $http, $log, HostStore) {
        var vm = this;

        $rootScope.commandController = vm;

        var options = { api: { route: 'api/handle' } };

        vm.send = function (keys) {

            var selectedHost = HostStore.get('selected');
            var selectedUrl = selectedHost.url;

            var url = 'http://' + selectedUrl + '/' + options.api.route;

            $http.post(url, { keys: keys }, { cache: false }).then(function (res) {
                $log.debug('Success: ', res);
            }, function (err) {
                $log.debug('Failed: ', err);
            });
        };
    }

})(angular);