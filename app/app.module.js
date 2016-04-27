(function (angular) {
    'use strict';

    angular.module('handlio.client', [
        'handlio.client.screen',
        'handlio.client.plugins'
    ]);

    _run.$inject = ['$rootScope'];
    angular.module('handlio.client').run(_run);

    function _run($root, $routeParams) {
        $root.$routeParams = $routeParams;
    }

})(angular);
