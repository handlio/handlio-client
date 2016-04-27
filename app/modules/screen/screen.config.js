(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screen');

    _config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    module.config(_config);

    function _config($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider.state('index', {
            url: '',
            templateUrl: 'modules/screen/screen.html',
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

        $urlRouterProvider.otherwise('/');

        // todo: ?
        // $locationProvider.html5Mode(true);
    }

})(angular);