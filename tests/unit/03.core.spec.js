var tape = require('tape');

var test = tape.angular.wrap();

test("Core module parts: ", function (assert) {
    angular.mock.module('handlio.client.core');

    inject(function (_, toastr) {
        assert.ok(_, '_');
        assert.ok(toastr, 'toastr');
    });

    inject(function (notification, CommandService) {
        assert.ok(notification, 'notification');
        assert.ok(CommandService, 'CommandService');
    });

    inject(function (PluginTracker) {
        assert.ok(PluginTracker, 'PluginTracker');
        assert.ok(PluginTracker.getPlugins, 'PluginTracker.getPlugins');
    });

    assert.end();
});

test("Plugin tracker: ", function (assert) {
    // angular.mock.module('handlio.client.core');

    // var testAppModule = angular.module('testApp', ['handlio.client.core']);
    //
    // testAppModule.config(['PluginTrackerProvider', function (PluginTrackerProvider) {
    //     assert.ok(PluginTrackerProvider, 'PluginTrackerProvider');
    //     assert.ok(PluginTrackerProvider.$get, 'PluginTrackerProvider.$get');
    //     assert.ok(PluginTrackerProvider.add, 'PluginTrackerProvider.add');
    // }]);

    // inject(function (PluginTracker) {
    //     assert.ok(PluginTracker);
    // });

    assert.end();
});