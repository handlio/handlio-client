(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screen');

    _constant.$inject = [];
    module.constant('ConfigState', _constant());

    function _constant() {
        return {
            shown: 'shown',
            hidden: 'hidden'
        };
    }

})(angular);