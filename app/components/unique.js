(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.components');

    _directive.$inject = [];
    module.directive('unique', _directive);

    function _directive() {
        return {
            require: 'ngModel',
            scope: { unique: '=' },
            link: _link
        };

        function _link(scope, elm, attrs, ctrl) {
            var list = scope.unique.list;
            var key = scope.unique.key;

            ctrl.$validators.unique = _checkUniqueness;

            function _checkUniqueness(modelValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return false;
                }

                if (!list || list.length === 0) return true;

                var found = list.filter(function (el) {
                    return modelValue === el[key];
                });

                return found.length === 0;
            }
        }
    }

})(angular);