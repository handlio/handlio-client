(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screens.main');

    _config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'PluginTrackerProvider'];
    module.config(_config);

    function _config($stateProvider, $locationProvider, $urlRouterProvider, PluginTrackerProvider) {
        $stateProvider.state('index', {
            url: '',
            templateUrl: 'core/screens/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });

        $stateProvider.state('plugin', {
            parent: 'index',
            url: '/:plugin',
            controller: function ($scope, $state) {
                $scope.$state = $state;
            },
            template: '<div dynamic-view directive="$state.params.plugin"></div>'
        });

        // todo: move somewhere
        PluginTrackerProvider.add({
            name: 'player',
            directive: 'player',
            button: {
                text: 'player'
            }
        });

        $urlRouterProvider.otherwise('/');

        // todo: ?
        // $locationProvider.html5Mode(true);
    }

})(angular);