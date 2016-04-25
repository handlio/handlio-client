(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.commands');

    _controller.$inject = ['$rootScope', 'CommandService'];
    module.controller('CommandController', _controller);

    function _controller($rootScope, CommandService) {
        var vm = this;

        $rootScope.commandController = vm;

        vm.send = CommandService.send;
    }

})(angular);