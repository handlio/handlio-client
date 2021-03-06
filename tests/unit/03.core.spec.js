var tape = require('tape');
var sinon = require('sinon');

var test = tape.angular.wrap();

test("Core module parts: ", function (assert) {
    angular.mock.module('handlio.client.core');

    inject(function (_, toastr) {
        assert.ok(_, '_');
        assert.ok(toastr, 'toastr');
    });

    inject(function (notification, CommandService, HostState) {
        assert.ok(notification, 'notification');
        assert.ok(CommandService, 'CommandService');
        assert.ok(HostState, 'HostState');
    });

    inject(function (PluginTracker) {
        assert.ok(PluginTracker, 'PluginTracker');
        assert.ok(PluginTracker.getPlugins, 'PluginTracker.getPlugins');
    });

    assert.end();
});

test("Plugin tracker: ", function (assert) {
    var testAppModule = angular.module('testApp', ['handlio.client.core']);

    testAppModule.config(['PluginTrackerProvider', function (PluginTrackerProvider) {
        assert.ok(PluginTrackerProvider, 'PluginTrackerProvider');
        assert.ok(PluginTrackerProvider.$get, 'PluginTrackerProvider.$get');
        assert.ok(PluginTrackerProvider.add, 'PluginTrackerProvider.add');

        var testPlugin = { test: 'Hello' };

        PluginTrackerProvider.add(testPlugin);
    }]);

    angular.mock.module('handlio.client.core', 'testApp');

    inject(function (PluginTracker) {
        assert.deepEqual(PluginTracker.getPlugins(), [{ test: 'Hello' }], 'should get all registered plugins');
    });

    assert.end();
});

test("Notification: ", function (assert) {
    angular.mock.module('handlio.client.core');

    angular.mock.module(function ($provide) {
        $provide.value('toastr', _getToastrMock());
        $provide.value('$log', _getLogMock());
    });

    inject(function (notification, $log, toastr) {
        assert.strictEqual(notification.log, $log.log, '$log.log method should be equal notification.log');

        assert.doesNotThrow(function () {
            $log.mock.expects('error').once();
            $log.mock.expects('info').twice();
            $log.mock.expects('warn').once();
            notification.error('error');
            notification.info('info');
            notification.warning('warning');
            notification.success('success');
            $log.mock.verify();
            $log.mock.restore();
        }, 'Should log all types of notification');

        // todo: toastr?

    });

    assert.end();
});

test("Host state: ", function (assert) {
    angular.mock.module('handlio.client.core');

    inject(function (HostState) {
        HostState.change({ host: 'test' });

        assert.deepEqual(HostState.get(), { host: 'test' }, 'should get current state correctly');
    });

    assert.end();
});

test("Command service: ", function (assert) {
    angular.mock.module('handlio.client.core');

    var testUrl = 'test';
    var state = {
        host: { url: testUrl }
    };
    var hostStateMockObject = {
        get: function () {
            return state.host;
        }
    };

    angular.mock.module(function ($provide) {
        $provide.value('HostState', hostStateMockObject);
        $provide.value('notification', _getNotificationMock());
    });

    var http = 'http://';
    var handleUrl = http + testUrl + '/api/handle';
    var verticalMoveUrl = http + testUrl + '/api/mouse/move/vertical';
    var horizontalMoveUrl = http + testUrl + '/api/mouse/move/horizontal';

    inject(function ($httpBackend, CommandService, notification) {

        $httpBackend.when('POST', handleUrl).respond({});

        assert.doesNotThrow(function () {
            $httpBackend.expect('POST', handleUrl, { keys: 'Keys', window: 'Test' }).respond(200, '');
            CommandService.send('Keys', 'Test').then(_success(assert), _failed(assert));
        }, 'should send successfully with all arguments');

        assert.doesNotThrow(function () {
            $httpBackend.flush();

            $httpBackend.expect('POST', handleUrl, { keys: 'Keys', window: '[ACTIVE]' }).respond(200, '');
            CommandService.send('Keys').then(_success(assert), _failed(assert));
        }, "should send successfully without window argument. should use '[ACTIVE]' window argument");

        state.host = null;

        assert.doesNotThrow(function () {
            $httpBackend.flush();

            notification.mock.expects('error').once();
            CommandService.send('Keys').then(_success(assert), _failed(assert));
            notification.mock.verify();
        }, "should throw error notification when host is not selected");

        state.host = { url: testUrl };

        assert.doesNotThrow(function () {
            $httpBackend.expect('POST', handleUrl, { keys: '', window: '[ACTIVE]' }).respond(400);
            CommandService.send('').then(_success(assert), _failed(assert));
            $httpBackend.flush();
        }, "should throw an error when keys is not specified");

        assert.doesNotThrow(function () {
            $httpBackend.expect('POST', verticalMoveUrl, { step: 10, times: 3 }).respond(200, '');
            CommandService.mouse.move('vertical', 10, 3).then(_success(assert), _failed(assert));
            $httpBackend.flush();
        }, 'should successfully send mouse move  vertically requests with all arguments');

        assert.doesNotThrow(function () {
            $httpBackend.expect('POST', horizontalMoveUrl, { step: 10, times: 3 }).respond(200, '');
            CommandService.mouse.move('horizontal', 10, 3).then(_success(assert), _failed(assert));
            $httpBackend.flush();
        }, 'should successfully send mouse move horizontally requests with all arguments');

        state.host = null;

        assert.doesNotThrow(function () {
            notification.mock.expectations = {};
            notification.mock.expects('error').once();
            CommandService.mouse.move().then(_success(assert), _failed(assert));
            notification.mock.verify();
        }, "should throw error notification when host is not set for mouse move");

        state.host = { url: testUrl };

        assert.doesNotThrow(function () {
            notification.mock.expectations = {};
            notification.mock.expects('error').once();
            CommandService.mouse.move().then(_success(assert), _failed(assert));
            notification.mock.verify();
        }, "should throw error notification when orientation is not set for mouse move");

        assert.doesNotThrow(function () {
            notification.mock.expectations = {};
            notification.mock.expects('error').once();
            CommandService.mouse.move('111').then(_success(assert), _failed(assert));
            notification.mock.verify();
        }, "should throw error notification when orientation is set to wrong value for mouse move");

        assert.doesNotThrow(function () {
            notification.mock.expectations = {};
            notification.mock.expects('error').once();
            $httpBackend.expect('POST', horizontalMoveUrl, { step: '', times: 3 }).respond(400);
            CommandService.mouse.move('horizontal', '', 3).then(_success(assert), _failed(assert));
            $httpBackend.flush();
            notification.mock.verify();
        }, 'should throw an error when step is not specified');

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    assert.end();
});

function _noop() {

}

function _success(assert) {
    return function () {
        assert.true(true, 'success stub');
    };
}

function _failed(assert) {
    return function () {
        assert.true(false, 'failed stub');
    };
}

function _getLogMock() {
    var mockValue = {
        info: _noop,
        debug: _noop,
        error: _noop,
        warn: _noop,
        log: _noop
    };
    mockValue.mock = sinon.mock(mockValue);
    return mockValue;
}

function _getToastrMock() {
    var mockValue = {
        info: _noop,
        success: _noop,
        error: _noop,
        warning: _noop
    };
    mockValue.mock = sinon.mock(mockValue);
    return mockValue;
}

function _getNotificationMock() {
    var mockValue = {
        error: _noop
    };
    mockValue.mock = sinon.mock(mockValue);
    return mockValue;
}