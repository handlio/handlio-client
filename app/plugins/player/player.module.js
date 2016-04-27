(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.plugins.player', [
        'handlio.client.core'
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