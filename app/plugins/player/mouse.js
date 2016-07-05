(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.plugins.player');

    _directive.$inject = ['CommandService'];
    module.directive('mouse', _directive);

    function _directive(CommandService) {

        var options = { delay: 100 };

        return {
            scope: {},
            templateUrl: 'plugins/player/mouse.html',
            link: _link
        };

        function _link(scope) {
            scope.moveVertically = _makeDelayedExecution(_moveVertically);
            scope.moveHorizontally = _makeDelayedExecution(_moveHorizontally);
        }

        function _makeDelayedExecution(fn) {
            return _debounce(fn, options.delay);
        }

        function _moveVertically(calls, step) {
            CommandService.mouse.move('vertical', step, calls);
        }

        function _moveHorizontally(calls, step) {
            CommandService.mouse.move('horizontal', step, calls);
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