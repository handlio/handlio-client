(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screens');

    _playerDirective.$inject = [];
    module.directive('player', _playerDirective);

    function _playerDirective() {
        return {
            templateUrl: 'core/screens/player/player.html'
        };
    }
    
})(angular);