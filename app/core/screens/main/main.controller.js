(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screens.main');

    _controller.$inject = ['store', 'ConfigState', 'CustomPlugins'];
    module.controller('MainController', _controller);

    function _controller(store, ConfigState, CustomPlugins) {
        var vm = this;

        var configState = store.get('config:state');
        vm.showConfigurator = configState === null ? false : configState === ConfigState.shown;
        
        vm.plugins = CustomPlugins();
        
        vm.toggleConfig = _toggleConfig;

        // private functions

        function _toggleConfig(configVisibility) {
            vm.showConfigurator = !configVisibility;
            store.set('config:state', vm.showConfigurator ? ConfigState.shown : ConfigState.hidden);
        }
    }

    _provider.$inject = ['$routeProvider'];
    module.provider('CustomPlugins', _provider);

    function _provider($routeProvider) {

        // initialization

        var plugins = [];

        // public

        this.add = _add;
        this.init = angular.noop;

        _get.$inject = [];
        this.$get = _get;

        // private functions

        function _add(pluginDefinition) {
            var name = pluginDefinition.name;
            // var routeConfig = {
            //     template: '<div dynamic-view directive="' + pluginDefinition.directive + '"></div>'
            // };
            // $routeProvider.when('/main/' + name, routeConfig);
            plugins.push({ name: name });
        }

        // function _get() {
        //     return {
        //         getPlugins: function () {
        //             return [];
        //         }
        //     };
        // }

        function _get() {
            return function () {
                return plugins;
            }
        }
    }

    _directive.$inject = ['$compile'];
    module.directive('dynamicView', _directive);

    function _directive($compile) {
        var scopeDefinition = { directive: '=' };
        return { scope: scopeDefinition, link: _link };

        function _link(scope, element) {
            var generatedTemplate = '<div ' + scope.directive + '></div>';
            element.append($compile(generatedTemplate)(scope));
        }
    }

})(angular);