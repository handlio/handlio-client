(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screen');

    _directive.$inject = ['$compile'];
    module.directive('dynamicView', _directive);

    function _directive($compile) {
        var scopeDefinition = { directive: '=' };
        return { scope: scopeDefinition, link: _link };

        function _link(scope, element) {
            var generatedTemplate = '<div ' + scope.directive + '></div>';
            element.append($compile(generatedTemplate)(scope));
        }
    }

})(angular);