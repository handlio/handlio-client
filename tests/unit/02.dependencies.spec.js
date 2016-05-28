var tape = require('tape');

var test = tape.angular.wrap();

test("Modules dependencies: ", function (assert) {
    var handlioModule = angular.module('handlio.client');
    assert.ok(handlioModule, 'handlioModule');
    assert.deepEqual(handlioModule.requires, ['handlio.client.screen', 'handlio.client.plugins'], 'handlioModule dependencies');

    var coreModule = angular.module('handlio.client.core');
    assert.ok(coreModule, 'coreModule');
    assert.deepEqual(coreModule.requires, [], 'coreModule dependencies');

    var screenModule = angular.module('handlio.client.screen');
    assert.ok(screenModule, 'screenModule');
    assert.deepEqual(screenModule.requires, [
        'ui.router',
        'angular-storage',
        'handlio.client.core',
        'handlio.client.configurator',
        'handlio.client.command-sender'
    ], 'screenModule dependencies');

    var pluginsModule = angular.module('handlio.client.plugins');
    assert.ok(pluginsModule, 'pluginsModule');
    assert.deepEqual(pluginsModule.requires, [
        'handlio.client.core',
        'handlio.client.screen',
        'handlio.client.plugins.player'
    ], 'pluginsModule dependencies');

    var configuratorModule = angular.module('handlio.client.configurator');
    assert.ok(configuratorModule, 'configuratorModule');
    assert.deepEqual(configuratorModule.requires, ['handlio.client.hosts'], 'configuratorModule dependencies');

    var commandSenderModule = angular.module('handlio.client.command-sender');
    assert.ok(commandSenderModule, 'commandSenderModule');
    assert.deepEqual(commandSenderModule.requires, ['handlio.client.core'], 'commandSenderModule dependencies');

    var hostsModule = angular.module('handlio.client.hosts');
    assert.ok(hostsModule, 'hostsModule');
    assert.deepEqual(hostsModule.requires, [
        'angular-storage',
        'handlio.client.core',
        'handlio.client.components'
    ], 'hostsModule dependencies');

    var componentsModule = angular.module('handlio.client.components');
    assert.ok(componentsModule, 'componentsModule');
    assert.deepEqual(componentsModule.requires, [], 'componentsModule dependencies');

    var playerModule = angular.module('handlio.client.plugins.player');
    assert.ok(playerModule, 'playerModule');
    assert.deepEqual(playerModule.requires, ['handlio.client.core'], 'playerModule dependencies');

    assert.end();
});