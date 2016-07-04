var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("player plugin", function (assert) {

    angular.mock.module('handlio.client.screen');
    angular.mock.module('handlio.client.plugins');
    angular.mock.module('handlio.client.plugins.player');
    angular.mock.module('handlio.client.templateCache');
    var commandServiceMockValue = { mouse: { move: sinon.spy() } };

    // var commandServiceMockObject = {
    //     mock: sinon.mock(commandServiceMockValue)
    // };

    angular.mock.module(function ($provide) {
        $provide.value('CommandService', commandServiceMockValue);
    });

    var _$compile, _$rootScope, _$controller, _$state, _$stateParams;

    inject(function ($compile, $rootScope, $controller, $state, $stateParams) {
        _$compile = $compile;
        _$rootScope = $rootScope;
        _$controller = $controller;
        _$state = $state;
        _$stateParams = $stateParams;
    });

    assert.doesNotThrow(function () {
        _$state.go('plugin', { plugin: 'player' });
        _$rootScope.$digest();

        var compileFn = _compileDirective(_$compile);

        var scope = _$rootScope.$new();

        var current = _$state.current;

        current.controller(scope, _$state);
        assert.equal(scope.$state, _$state, "'player' state's controller scope should has $state");

        var compiledElement = compileFn(current.template, scope);
        assert.equal($(compiledElement).find('div.ng-scope[player]').length, 1, "should contains player directive inside");

        assert.equal(_$state.current.name, 'plugin', "should be on plugin state");
        assert.equal(_$stateParams.plugin, 'player', "should be on player plugin state");

        var mouseElement = $(compiledElement).find('div.ng-isolate-scope[mouse]');
        assert.equal(mouseElement.length, 1, "should contains mouse directive inside");

        var mouseIsolateScope = angular.element(mouseElement).isolateScope();

        assert.ok(mouseIsolateScope.moveHorizontally, "mouse scope should contains moveHorizontally method");
        assert.ok(mouseIsolateScope.moveVertically, "mouse scope should contains moveVertically method");

        var horizontal = mouseIsolateScope.moveHorizontally;
        var vertical = mouseIsolateScope.moveVertically;


        assert.test(function (sub) {
            sub.plan(3);

            commandServiceMockValue.mouse.move.withArgs('horizontal', 10, 4);
            commandServiceMockValue.mouse.move.withArgs('vertical', 10, 2);
            commandServiceMockValue.mouse.move.withArgs('vertical', 10, 1);

            horizontal(10);
            horizontal(10);
            horizontal(10);
            horizontal(10);

            setTimeout(function () {
                sub.true(commandServiceMockValue.mouse.move.withArgs('horizontal', 10, 4).calledOnce, "should call 'CommandService.mouse.move' method once inside");

                vertical(10);
                vertical(10);

                setTimeout(function () {
                    vertical(10);

                    setTimeout(function () {
                        sub.true(commandServiceMockValue.mouse.move.withArgs('vertical', 10, 2).calledOnce, "should call 'CommandService.mouse.move' method once inside");
                        sub.true(commandServiceMockValue.mouse.move.withArgs('vertical', 10, 1).calledOnce, "should call 'CommandService.mouse.move' method once inside");
                    }, 400);
                }, 300);

            }, 400);
        }, "should correctly handle move methods behavior");

    }, "should successfully go to the plugin state");

    assert.end();
});

function _compileDirective($compile) {
    return function _compileElement(html, scope) {
        var element = angular.element(html);
        var compiledElement = $compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }
}

function _noop() {

}