(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.plugins.player');

    _directive.$inject = [];
    module.directive('mouse', _directive);

    function _directive() {
        return {
            templateUrl: 'plugins/player/mouse.html',
            link: _link
        };

        function _link() {

        }
    }

})(angular);