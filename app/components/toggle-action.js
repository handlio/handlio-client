(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.components');

    _directive.$inject = ['$timeout'];
    module.directive('toggleAction', _directive);

    function _directive($timeout) {
        return {
            scope: {
                toggleAction: '='
            },
            link: _link
        };

        function _link(scope, element) {
            if (!scope.toggleAction)
                throw new Error("Callback and value were not provided.");

            if (typeof scope.toggleAction.fn !== 'function')
                throw new Error("Callback was not provided.");

            var toggleInitialValue = scope.toggleAction.value;
            if (typeof toggleInitialValue !== 'boolean')
                throw new Error("Value was not provided.");

            $(element).bootstrapToggle(toggleInitialValue ? 'on' : 'off');

            $(element).change(function () {
                $timeout(function () {
                    scope.toggleAction.fn(angular.element(element).prop('checked'));
                }, 0);
            });
        }
    }

})(angular);