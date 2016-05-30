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
            "<input name=\"name\" type=\"text\" " +
            "ng-model=\"state.model\" " +
            "unique=\"{list: state.list, key: key}\">");

        assert.doesNotThrow(function () {
            $compile(element)(scope);
            scope.$digest();

            element.html();

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
    }]);

    assert.end();
});

function _noop() {

}