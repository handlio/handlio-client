(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.plugins.player');

    _directive.$inject = ['CommandService'];
    module.directive('mouse', _directive);

    function _directive(CommandService) {
        return {
            templateUrl: 'plugins/player/mouse.html',
            link: _link
        };

        function _link(scope) {
            scope.up = _wrap(function (calls) {
                CommandService.mouse.move('vertical', 10, calls);
            });

            function _wrap(fn) {
                return _debounce(fn, 1000);
            }
        }

        function _debounce(fn, delay) {
            var timer = null;

            _run.calls = 0;
            return _run;

            function _run() {
                var context = this, args = arguments;
                clearTimeout(timer);
                _run.calls++;
                timer = setTimeout(function () {
                    var contextArgs = [_run.calls];
                    Array.prototype.push.apply(contextArgs, args);
                    fn.apply(context, contextArgs);
                    _run.calls = 0;
                }, delay);
            }
        }
    }

})(angular);