(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screens.player');

    _directive.$inject = [];
    module.directive('player', _directive);

    function _directive() {
        return {
            templateUrl: 'core/screens/player/player.html'
        };
    }
    
})(angular);