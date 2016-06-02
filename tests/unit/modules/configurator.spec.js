var tape = require('tape');
var sinon = require('sinon');
var fs = require('fs');
// require();

var test = tape.angular.wrap();

test("'configurator' directive ", function (assert) {

    // var configuratorTemplate = fs.readFileSync('../../../app/modules/configurator/configurator.html', );

    angular.mock.module('handlio.client.configurator');
    angular.mock.module('handlio.client.templateCache');

    inject(['$compile', '$rootScope', '$templateCache', function ($compile, $rootScope, $templateCache) {

        // $httpBackend.expect('GET', 'modules/configurator/configurator.html');
        assert.doesNotThrow(function () {
            var compiled = _compileElement('<div configurator></div>', $rootScope.$new());

            assert.true(compiled.hasClass('ng-scope'), "has ng-scope class");
            assert.equal(compiled.find('form').length, 1, "has hosts form inside");
        }, "should compile 'configurator' directive successfully");

        function _compileElement(html, scope) {
            var element = angular.element(html);
            var compiledElement = $compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }

    }]);

    assert.end();

});