var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("'hosts' directive ", function (assert) {

    angular.mock.module('handlio.client.hosts');
    angular.mock.module('handlio.client.templateCache');

    inject(['$compile', '$rootScope', '$controller', function ($compile, $rootScope, $controller) {

        assert.doesNotThrow(function () {
            var compiled = _compileElement('<div hosts></div>', $rootScope.$new());

            assert.true(compiled.hasClass('ng-scope'), "has ng-scope class");
            assert.equal(compiled.find('form').length, 1, "has hosts form inside");
        }, "should compile 'hosts' directive successfully");

        var scope = $rootScope.$new();
        var ctrl = $controller('HostsController', {
            $scope : scope
        });

        assert.ok(ctrl.addHost, "method 'addHost' exist in controller");
        assert.ok(ctrl.list, "object 'list' exist in controller");
        assert.ok(ctrl.model, "object 'model' exist in controller");
        assert.ok(ctrl.new, "object 'new' exist in controller");
        assert.ok(ctrl.removeHost, "method 'removeHost' exist in controller");
        assert.ok(ctrl.saveSelected, "method 'saveSelected' exist in controller");

        function _compileElement(html, scope) {
            var element = angular.element(html);
            var compiledElement = $compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }

    }]);

    assert.end();

});