(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screen');

    _config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    module.config(_config);

    _run.$inject = ['$rootScope', '$state'];
    module.run(_run);

    function _config($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider.state('index', {
            url: '',
            templateUrl: 'modules/screen/screen.html',
            controller: 'ScreenController',
            controllerAs: 'screen'
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

        $locationProvider.html5Mode(true);
    }

    function _run($rootScope, $state) {
        $rootScope.$state = $state;
    }

})(angular);