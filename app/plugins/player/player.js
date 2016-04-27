(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.plugins.player');

    _directive.$inject = [];
    module.directive('player', _directive);

    function _directive() {
        return {
            templateUrl: 'plugins/player/player.html'
        };
    }
    
})(angular);