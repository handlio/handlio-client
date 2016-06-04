var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("'hosts' directive ", function (assert) {

    angular.mock.module('handlio.client.hosts');
    angular.mock.module('handlio.client.templateCache');

    inject(['$compile', '$rootScope', function ($compile, $rootScope) {

        assert.doesNotThrow(function () {
            var compiled = _compileElement('<div hosts></div>', $rootScope.$new());

            assert.true(compiled.hasClass('ng-scope'), "has ng-scope class");
            assert.equal(compiled.find('form').length, 1, "has hosts form inside");
        }, "should compile 'hosts' directive successfully");

        function _compileElement(html, scope) {
            var element = angular.element(html);
            var compiledElement = $compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }

    }]);

    assert.end();

});