var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("'Unique' directive ", function (assert) {
    angular.mock.module('handlio.client.components');

    inject(['$compile', '$rootScope', function ($compile, $rootScope) {

        var scope = $rootScope;

        scope.key = 'name';
        scope.state = {
            model: 'name',
            list: [{ name: 'test' }]
        };

        var element = angular.element(
            '<input type="text" ng-model="state.model" unique="{ list: state.list, key: key }">');

        assert.doesNotThrow(function () {
            $compile(element)(scope);
            scope.$digest();

            assert.ok(element.hasClass('ng-valid'), 'should has ng-valid class');
        }, "should compile unique directive successfully");

        assert.doesNotThrow(function () {
            element.val('test');

            /* manually dispatch 'input' event if JQuery is not used.
             http://stackoverflow.com/a/26376249
             Matt Richards Mar 26 '15 at 15:32
             */
            element[0].dispatchEvent(new Event('input'));
            scope.$apply();

            assert.ok(element.hasClass('ng-invalid'), 'should has ng-invalid class');
            assert.ok(element.hasClass('ng-invalid-unique'), 'should has ng-invalid-unique class');

        }, "should run unique directive validator and set validation state to invalid");

        assert.doesNotThrow(function () {
            element.val('');

            element[0].dispatchEvent(new Event('input'));
            scope.$apply();

            assert.ok(element.hasClass('ng-empty'), 'should has ng-empty class');
            assert.ok(element.hasClass('ng-invalid'), 'should has ng-invalid class');
            assert.ok(element.hasClass('ng-invalid-unique'), 'should has ng-invalid-unique class');

        }, "should set validation state to invalid when value is empty");

        assert.doesNotThrow(function () {
            scope.state.list.splice(0, 1);
            element.val('test2');

            element[0].dispatchEvent(new Event('input'));
            scope.$apply();

            assert.ok(element.hasClass('ng-valid'), 'should has ng-valid class');
            assert.ok(element.hasClass('ng-valid-unique'), 'should has ng-valid-unique class');

        }, "should set validation state to valid when value is changed and list is empty");

        element = angular.element(
            '<input type="text" unique="{ list: state.list, key: key }">');

        assert.throws(function () {
            $compile(element)(scope);
            scope.$digest();
        }, "should throws an error unique directive when input does not contain 'ng-model' directive");
    }]);

    assert.end();
});

test("'Toggle action' directive ", function (assert) { // eslint-disable-line max-statements
    angular.mock.module('handlio.client.components');

    var _$compile, _$rootScope;
    inject(['$compile', '$rootScope', '$timeout', function ($compile, $rootScope, $timeout) {
        _$compile = $compile;
        _$rootScope = $rootScope;
    }]);

    var scope = _$rootScope.$new();

    scope.fn = _noop;
    scope.value = true;

    var element = angular.element(
        '<input type="checkbox" toggle-action="{ fn: fn, value: value }">');

    assert.doesNotThrow(function () {
        _$compile(element)(scope);
        scope.$digest();
    }, "should compile Toggle action directive successfully with value=false and correct callback");

    element = angular.element(
        '<input type="checkbox" toggle-action="{ value: value }">');

    assert.throws(function () {
        _$compile(element)(scope);
        scope.$digest();
    }, "should not compile Toggle action directive successfully without 'fn' argument");

    element = angular.element(
        '<input type="checkbox" toggle-action="{ fn: fn }">');

    assert.throws(function () {
        _$compile(element)(scope);
        scope.$digest();
    }, /Value was not provided/, "should not compile Toggle action directive successfully without 'value' argument");

    element = angular.element(
        '<input type="checkbox" toggle-action="{}">');

    assert.throws(function () {
        _$compile(element)(scope);
        scope.$digest();
    }, /Callback was not provided/, "should not compile Toggle action directive successfully without 'fn' and 'value' arguments");

    element = angular.element(
        '<input type="checkbox" toggle-action>');

    assert.throws(function () {
        _$compile(element)(scope);
        scope.$digest();
    }, /Callback and value were not provided/, "should not compile Toggle action directive successfully with undefined toggle action value");

    scope = _$rootScope.$new();
    scope.behaviour = { fn: _noop, value: false };

    element = angular.element(
        '<input type="checkbox" toggle-action="behaviour">');

    assert.doesNotThrow(function () {
        _$compile(element)(scope);
        scope.$digest();
    }, "should compile Toggle action directive successfully with value=false");

    scope = _$rootScope.$new();
    scope.behaviour = { fn: _noop, value: {} };

    assert.throws(function () {
        _$compile(element)(scope);
        scope.$digest();
    }, /Value was not provided/, "should throw when 'value' is not a boolean type");

    scope = _$rootScope.$new();
    scope.behaviour = { fn: {}, value: false };

    assert.throws(function () {
        _$compile(element)(scope);
        scope.$digest();
    }, /Callback was not provided/, "should throw when 'fn' is not a function");

    scope = _$rootScope.$new();
    scope.behaviour = { fn: _test1, value: false };

    var compiled = _$compile(element)(scope);
    scope.$digest();

    var isolatedScope = compiled.isolateScope();
    isolatedScope.toggleAction.fn = _test2;
    assert.equal(isolatedScope.toggleAction.fn, scope.behaviour.fn, "should change object from external scope when isolatedScope is changed");
    isolatedScope.$destroy();

    // todo:
    // scope.$destroy();
    // scope = _$rootScope.$new();
    // var callback = sinon.spy();
    //
    // scope.behaviour = { fn: callback, value: false };
    //
    // compiled = _$compile(element)(scope);
    // scope.$digest();
    //
    // isolatedScope = compiled.isolateScope();
    // assert.test("should not throw when input checked state has changed", function (assert) {
    //     assert.plan(2);
    //
    //     assert.doesNotThrow(function () {
    //         element.prop("checked", true);
    //         scope.$apply();
    //         // $timeout.flush();
    //
    //         // setTimeout(function () {
    //             assert.true(callback.calledOnce);
    //         // }, 300);
    //     });
    // });

    assert.end();
});

function _noop() {

}

function _test1() {

}

function _test2() {

}