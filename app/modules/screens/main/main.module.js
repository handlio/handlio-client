(function (angular) {
    'use strict';

    angular.module('handlio.client.screens.main', [
        'ngRoute',
        'ui.router',
        'angular-storage'
    ]);


    _run.$inject = ['$rootScope', 'CommandService'];
    angular.module('handlio.client.screens.main').run(_run);

    function _run($rootScope, CommandService) {
        $rootScope.commands = CommandService;
    }

})(angular);