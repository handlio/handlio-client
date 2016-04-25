(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.core', []);

    _run.$inject = ['$rootScope', 'CommandService'];
    module.run(_run);

    function _run($rootScope, CommandService) {
        $rootScope.commands = CommandService;
    }

})(angular);