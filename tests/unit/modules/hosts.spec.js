var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("'hosts' directive", function (assert) {

    var hostStoreMock = {
        get: _spy(), set: _spy(), remove: _spy(),
        reset: _reset(['get', 'set', 'remove'])
    };
    var hostStateMock = { change: _spy(), get: _spy(), reset: _reset(['get', 'change']) };

    angular.mock.module('handlio.client.hosts');
    angular.mock.module('handlio.client.templateCache');
    angular.mock.module(function ($provide) {
        $provide.value('HostStore', hostStoreMock);
        $provide.value('HostState', hostStateMock);
    });

    var _$compile, _$rootScope, _$controller;

    inject(function ($compile, $rootScope, $controller) {
        _$compile = $compile;
        _$rootScope = $rootScope;
        _$controller = $controller;
    });

    assert.doesNotThrow(function () {
        var compiled = _compileElement('<div hosts></div>', _$rootScope.$new());

        assert.true(compiled.hasClass('ng-scope'), "has ng-scope class");
        assert.equal(compiled.find('form').length, 1, "has hosts form inside");
    }, "should compile 'hosts' directive successfully");

    var ctrl = _$controller('HostsController');

    assert.ok(ctrl.addHost, "method 'addHost' exist in controller");
    assert.ok(ctrl.list, "object 'list' exist in controller");
    assert.ok(ctrl.model, "object 'model' exist in controller");
    assert.ok(ctrl.new, "object 'new' exist in controller");
    assert.ok(ctrl.removeHost, "method 'removeHost' exist in controller");
    assert.ok(ctrl.saveSelected, "method 'saveSelected' exist in controller");

    assert.throws(function () {
        ctrl.addHost(null);
    }, "should throws when host is null or undefined");

    var testHost = { name: 'name', url: 'http://1.1.1.1' };

    assert.doesNotThrow(function () {
        ctrl.addHost(testHost);
        assert.equal(ctrl.list.length, 1, "should contains only one host");
        assert.true(hostStoreMock.set.calledTwice, "should call 'HostStore.set' method twice inside");
        assert.true(hostStateMock.change.calledOnce, "should call 'HostState.change' method once inside");
        hostStoreMock.reset();
        hostStateMock.reset();
    }, "should add host successfully");

    assert.doesNotThrow(function () {
        ctrl.removeHost(testHost, 0);
        assert.equal(ctrl.list.length, 0, "should contains no hosts");
        assert.equal(ctrl.model.selected, null, "should not has selected host");
        assert.true(hostStoreMock.set.calledOnce, "should call 'HostStore.set' method once inside");
        assert.true(hostStoreMock.remove.calledOnce, "should call 'HostStore.remove' method once inside");
        assert.true(hostStateMock.change.calledOnce, "should call 'HostState.change' method once inside");
        hostStoreMock.reset();
        hostStateMock.reset();
    }, "should remove host successfully");

    var get = sinon.stub();
    get.withArgs('list').returns([testHost]);
    get.withArgs('selected').returns(testHost);
    hostStoreMock.get = get;

    ctrl = _$controller('HostsController');

    assert.doesNotThrow(function () {
        assert.equal(ctrl.list.length, 1, "should contains only one host");
        assert.deepEqual(ctrl.list[0], testHost, "should contains testHost");
        assert.deepEqual(ctrl.model.selected, testHost, "selected host should be the testHost");
        assert.true(hostStoreMock.get.calledTwice, "should call 'HostStore.get' method twice inside");
        assert.true(hostStateMock.change.calledOnce, "should call 'HostState.change' method once inside");
        hostStoreMock.reset();
        hostStateMock.reset();
    }, "should add host successfully");

    get = sinon.stub();
    var test1 = { name: '1', url: '1' };
    var test2 = { name: '2', url: '2' };

    get.withArgs('list').returns([testHost, test1, test2]);
    get.withArgs('selected').returns(testHost);
    hostStoreMock.get = get;

    ctrl = _$controller('HostsController');

    assert.doesNotThrow(function () {
        assert.equal(ctrl.list.length, 3, "should contains three host");
        assert.deepEqual(ctrl.list[0], testHost, "should contains testHost");
        assert.deepEqual(ctrl.model.selected, testHost, "selected host should be the testHost");
        assert.true(hostStoreMock.get.calledTwice, "should call 'HostStore.get' method twice inside");
        assert.true(hostStateMock.change.calledOnce, "should call 'HostState.change' method once inside");

        hostStoreMock.reset();
        hostStateMock.reset();

        ctrl.removeHost(test1, 1);
        assert.deepEqual(ctrl.model.selected, testHost, "selected host was not changed");
        ctrl.addHost(test1);
        assert.deepEqual(ctrl.model.selected, test1, "selected host was changed to 'test1'");
        ctrl.removeHost(test1, 2);
        assert.deepEqual(ctrl.model.selected, testHost, "selected host was changed and equals to 'testHost' again");

    }, "add-remove functionality");

    function _compileElement(html, scope) {
        var element = angular.element(html);
        var compiledElement = _$compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    assert.end();

});

function _spy() {
    return sinon.spy();
}

function _reset(methods) {
    return function () {
        var instance = this;
        methods.forEach(function (method) {
            instance[method].reset();
        });
    };
}