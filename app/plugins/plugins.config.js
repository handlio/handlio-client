(function (angular) {
    'use strict';

    // todo: load modules dynamically
    var module = angular.module('handlio.client.plugins', [
        'handlio.client.core',
        'handlio.client.screen',
        'handlio.client.plugins.player'
    ]);

    _config.$inject = ['PluginTrackerProvider'];
    module.config(_config);

    function _config(PluginTrackerProvider) {
        PluginTrackerProvider.add({
            name: 'player',
            directive: 'player',
            button: {
                text: 'player'
            }
        });
    }

})(angular);