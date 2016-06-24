(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.core');

    _provider.$inject = ['_'];
    module.provider('PluginTracker', _provider);

    function _provider(_) {

        // initialization

        var plugins = [];

        // public

        this.add = _add;

        _get.$inject = [];
        this.$get = _get;

        // private functions

        function _add(pluginDefinition) {
            plugins.push(pluginDefinition);
        }

        function _get() {
            return {
                getPlugins: function () {
                    return plugins;
                },
                getPlugin: function (name) {
                    return _.find(plugins, { name: name });
                }
            };
        }
    }

})(angular);