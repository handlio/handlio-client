(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.commands');

    _controller.$inject = ['$http'];
    module.controller('CommandController', _controller);

    function _controller($http) {
        var vm = this;

        var options = {
            api: {
                route: 'api/handle'
            }
        };

        vm.send = function (keys) {
            var url = 'http://' + vm.model.selectedUrl + '/' + options.api.route;

            $http.post(url, { keys: keys }, { cache: false }).then(function (res) {
                $log.debug('Success: ', res);
            }, function (err) {
                $log.debug('Failed: ', err);
            });
        };
    }

})(angular);