'use strict';

angular.module('myApp.main', ['ngRoute', 'angular-storage'])
    .factory('HostStore', [
        'store',
        function (store) {
            return store.getNamespacedStore('hosts');
        }
    ])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/main', {
                templateUrl: 'main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            });
        }
    ])

    .controller('MainCtrl', [
        'HostStore',
        function (HostStore) {
            this.hosts = HostStore.get('list') || [];

            this.selected = this.hosts[0] || {ip: '', name: ''};

            this.addHost = function (host) {
                this.hosts.push(host);
                HostStore.set('list', this.hosts);
            }
        }
    ]);