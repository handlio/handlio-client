(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.configurator');

    _hostStoreFactory.$inject = ['store'];
    module.factory('HostStore', _hostStoreFactory);

    function _hostStoreFactory(store) {
        return store.getNamespacedStore('hosts');
    }

})(angular);