(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screens.main');

    _config.$inject = ['$routeProvider', 'CustomPluginsProvider'];
    module.config(_config);

    function _config($routeProvider, CustomPluginsProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'core/screens/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });

        $routeProvider.when('/main/:plugin', {
            template: '<div dynamic-view directive="$routeParams.plugin"></div>'
        });

        CustomPluginsProvider.add({
            name: 'player',
            directive: 'player',
            button: {
                text: 'player'
            }
        });
    }

})(angular);