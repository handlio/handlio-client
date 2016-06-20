(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screen');

    _directive.$inject = ['$compile', 'PluginTracker'];
    module.directive('dynamicView', _directive);

    function _directive($compile, PluginTracker) {
        var scopeDefinition = { directive: '=' };
        return { scope: scopeDefinition, link: _link };

        function _link(scope, element) {
            var plugin = PluginTracker.getPlugin(scope.directive);

            if (!plugin) {
                throw new Error("Could not find '" + scope.directive + "' plugin");
            }

            var generatedTemplate = plugin.directive;
            element.append($compile(generatedTemplate)(scope.$new(true)));
        }
    }

})(angular);