var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("command-sender module", function (assert) {

    var storeMock = { get: sinon.stub(), set: sinon.spy() };

    angular.mock.module('handlio.client.command-sender');
    angular.mock.module('handlio.client.templateCache');
    angular.mock.module(function ($provide) {
        $provide.value('store', storeMock);
    });

    var _$compile, _$rootScope, _$controller;

    inject(function ($compile, $rootScope, $controller) {
        _$compile = $compile;
        _$rootScope = $rootScope;
        _$controller = $controller;
    });

    var compileDirective = _compileDirective(_$compile);

    assert.doesNotThrow(function () {
        var scope = _$rootScope.$new();
        var compiledElement = compileDirective('<div command-sender></div>', scope);

        assert.equal($(compiledElement).find('form[name="senderForm"]').length, 1, "should has 'senderForm' inside");

        var directiveScope = compiledElement.isolateScope();

        assert.ok(directiveScope, "directive element should has scope");
        assert.ok(directiveScope.senderForm, "directive element scope should contains 'senderForm' form controller inside");
        assert.ok(directiveScope.commandSender, "directive element scope should contains 'commandSender' controller inside (controller as syntax)");

        assert.true(storeMock.get.calledOnce, "command sender controller should initiate one 'store.get' call");
        storeMock.get.reset();

        var senderCommand = directiveScope.commandSender.command;
        assert.ok(senderCommand, "command sender controller has 'command' property");
        assert.equal(senderCommand.window, '[ACTIVE]', "sender command 'window' property should be equaled to [ACTIVE] by default");

        assert.true(storeMock.set.calledOnce, "command sender controller should initiate one 'store.set' call when 'window' is not stored");
        storeMock.set.reset();

    }, "should successfully compile 'command-sender' directive");

    assert.doesNotThrow(function () {
        storeMock.get.withArgs('command-sender:window').returns('TEST');

        var ctrl = _$controller('CommandSenderController');

        assert.ok(ctrl.saveWindow, "command sender controller has 'saveWindow' method");
        assert.equal(ctrl.command.window, 'TEST', "command sender controller has 'command' property");

        assert.true(storeMock.set.notCalled, "command sender controller should not initiate 'store.set' call when 'window' is stored");
        storeMock.set.reset();

    }, "should successfully create 'CommandSenderController' instance");

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