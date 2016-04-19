(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.screens.main');

    _config.$inject = ['$routeProvider'];
    module.config(_config);

    function _config($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'core/screens/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });
    }

})(angular);