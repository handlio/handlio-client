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
            var defaults = {host: {url: '', name: ''}};

            this.hosts = HostStore.get('list') || [];
            this.new = angular.copy(defaults.host);
            this.model = {
                keys: '',
                selected: this.hosts[0] || null
            };

            this.addHost = function (host) {
                this.hosts.push({url: host.url, name: host.name});
                HostStore.set('list', this.hosts);
                this.new = angular.copy(defaults.host);
                this.model.selected = this.hosts[this.hosts.length - 1];
            };

            this.removeHost = function (host, index) {
                this.hosts.splice(index, 1);
                HostStore.set('list', this.hosts);
            };
        }
    ])

    .directive('unique', function () {
        return {
            require: 'ngModel',
            scope: {
                unique: '='
            },
            link: function (scope, elm, attrs, ctrl) {
                var list = scope.unique.list;
                var prop = scope.unique.prop;

                ctrl.$validators.unique = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return false;
                    }

                    if (!list || list.length === 0) return true;

                    var found = list.filter(function (el) {
                        return modelValue === el[prop];
                    });

                    return found.length === 0;
                };
            }
        };
    });