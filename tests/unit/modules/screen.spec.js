var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("screen module", function (assert) {

    angular.mock.module('handlio.client.screen');
    angular.mock.module('handlio.client.plugins');
    angular.mock.module('handlio.client.templateCache');
    angular.mock.module(function ($provide) {
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
        _$state.go('index');
        _$rootScope.$digest();
    }, "should successfully go to the index state");

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
    }, "should successfully go to the plugin state");

    assert.end();

});

test("'dynamic-view' directive", function (assert) {

    angular.mock.module('handlio.client.screen');
    angular.mock.module('handlio.client.plugins');
    angular.mock.module('handlio.client.templateCache');
    angular.mock.module(function ($provide) {
    });

    var _$compile, _$rootScope;

    inject(function ($compile, $rootScope) {
        _$compile = $compile;
        _$rootScope = $rootScope;
    });

    var compileFn = _compileDirective(_$compile);

    assert.doesNotThrow(function () {
        var scope = _$rootScope.$new();
        var compiledElement = compileFn('<div dynamic-view directive="\'player\'"></div>', scope);
        scope.$digest();

        assert.equal(compiledElement.isolateScope().directive, 'player', "isolated scope should contains directive property is equaled to 'player'");
        assert.equal($(compiledElement).find('div.ng-scope[player]').length, 1, "should contains player directive inside");
    }, "should successfully compile 'dynamic-view' directive");

    assert.end();
});

test("Screen Controller", function (assert) {

    var storeMock = { get: sinon.stub(), set: sinon.spy() };

    angular.mock.module('handlio.client.screen');
    angular.mock.module('handlio.client.plugins');
    angular.mock.module('handlio.client.templateCache');
    angular.mock.module(function ($provide) {
        $provide.value('store', storeMock);
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
        var ctrl = _$controller('ScreenController');

        assert.equal(ctrl.plugins.length, 1, "plugins should contains one plugin");
        assert.equal(ctrl.plugins[0].name, 'player', "plugins should contains 'player' plugin");

        assert.ok(ctrl.panels['configurator'], "screen should has 'configurator' panel");
        assert.ok(ctrl.panels['commandSender'], "screen should has 'commandSender' panel");

        assert.true(storeMock.get.calledTwice, "screen should initiate two 'store.get' calls");
        assert.true(ctrl.pluginView.active(), "plugin view on the screen should be in active state");

        ctrl.toggleConfig(true);

        assert.true(storeMock.set.calledOnce, "screen.toggleConfig should initiate one 'store.set' call");
        assert.false(ctrl.panels['configurator'].visible, "screen should has hidden 'configurator' panel");
        storeMock.set.reset();

        ctrl.toggleCommandSender(true);
        assert.false(ctrl.panels['commandSender'].visible, "screen should has hidden 'commandSender' panel");
        assert.true(storeMock.set.calledOnce, "screen.toggleCommandSender with true should initiate one 'store.set' call");
        storeMock.set.reset();

        ctrl.toggleCommandSender(false);
        assert.true(ctrl.panels['commandSender'].visible, "screen should has visible 'commandSender' panel");
        assert.true(storeMock.set.calledOnce, "screen.toggleCommandSender with false should initiate one 'store.set' call");

        assert.false(ctrl.pluginView.active(), "plugin view on the screen should be inactive");
        storeMock.set.reset();

    }, "should successfully create ScreenController instance");

    var get = sinon.stub();
    get.withArgs('config:state').returns('shown');
    storeMock.get = get;

    assert.doesNotThrow(function () {
        var ctrl = _$controller('ScreenController');

        assert.true(ctrl.panels['configurator'].visible, "screen should has visible 'configurator' panel");
        assert.false(ctrl.panels['commandSender'].visible, "screen should has hidden 'commandSender' panel");
        assert.false(ctrl.pluginView.active(), "plugin view on the screen should be inactive");

        ctrl.pluginView.makeActive();

        assert.true(ctrl.pluginView.active(), "plugin view on the screen should be active now");
        assert.false(ctrl.panels['configurator'].visible, "screen should has hidden 'configurator' panel");
        assert.false(ctrl.panels['commandSender'].visible, "screen should has hidden 'commandSender' panel");

    }, "should successfully create ScreenController instance with stored configuration");

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