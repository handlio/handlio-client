var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("screen module", function (assert) {

    angular.mock.module('handlio.client.screen');
    angular.mock.module('handlio.client.plugins.player');
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

        assert.equal(_$state.current.name, 'plugin', "should be on plugin state");
        assert.equal(_$stateParams.plugin, 'player', "should be on player plugin state");
    }, "should successfully go to the plugin state");

    function _compileElement(html, scope) {
        var element = angular.element(html);
        var compiledElement = _$compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    assert.end();

});