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

        function _link(scope, elm) {
            if (!scope.toggleAction)
                throw new Error("Callback and value were not provided.");

            if (!scope.toggleAction.fn)
                throw new Error("Callback was not provided.");

            var toggleInitialValue = scope.toggleAction.value;
            if (typeof toggleInitialValue !== 'boolean')
                throw new Error("Value was not provided.");
            
            $(elm).bootstrapToggle(toggleInitialValue ? 'on' : 'off');

            $(elm).change(function () {
                $timeout(function () {
                    scope.toggleAction.fn($(elm).prop('checked'));
                }, 0);
            });
        }
    }

})(angular);