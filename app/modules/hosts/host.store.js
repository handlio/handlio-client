(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.hosts');

    _hostStoreFactory.$inject = ['store'];
    module.factory('HostStore', _hostStoreFactory);

    function _hostStoreFactory(store) {
        return store.getNamespacedStore(
            'hosts'         /* namespace */,
            'localStorage'  /* storage type */,
            ':'             /* delimiter */,
            false           /* useCache */);
    }

})(angular);