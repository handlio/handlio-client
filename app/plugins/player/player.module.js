(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.plugins.player', [
        'handlio.client.core',
        'swipe'
    ]);

    _config.$inject = ['PluginTrackerProvider'];
    module.config(_config);

    function _config(PluginTrackerProvider) {
        PluginTrackerProvider.add({
            name: 'player',
            directive: '<div player class="container-fluid"></div>',
            button: { text: 'player' }
        });
    }

})(angular);