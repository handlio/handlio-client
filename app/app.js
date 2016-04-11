'use strict';

// Declare app level module which depends on views, and components
angular.module('handlio.client', [
    'ngRoute',
    'handlio.client.main',
    'angular-storage'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/main'});
}]);
