'use strict';

angular.module('handlio.client.main', ['ngRoute', 'angular-storage'])
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
        '$http', '$log', 'HostStore',
        function ($http, $log, HostStore) {
            var defaults = {host: {url: '', name: ''}};

            var ctrl = this;
            var options = {
                api: {
                    route: 'api/handle'
                }
            };

            ctrl.hidden = HostStore.get('hidden') === null ? false : HostStore.get('hidden');

            ctrl.hosts = HostStore.get('list') || [];

            ctrl.new = angular.copy(defaults.host);
            ctrl.model = {keys: ''};

            ctrl.model.selected = HostStore.get('selected') || ctrl.hosts[0] || null;
            if (!!ctrl.model.selected) {
                ctrl.model.selectedUrl = ctrl.model.selected.url;
            }

            ctrl.addHost = function (host) {
                var newHost = {
                    url: host.url, name: host.name,
                    createdAt: _toTicks(new Date())
                };
                ctrl.hosts.push(newHost);
                HostStore.set('list', ctrl.hosts);
                ctrl.new = angular.copy(defaults.host);
                ctrl.model.selected = newHost;
                ctrl.model.selectedUrl = newHost.url;
                HostStore.set('selected', {
                    url: newHost.url, name: newHost.name,
                    createdAt: newHost.createdAt
                });
            };

            ctrl.saveSelected = function (host) {
                HostStore.set('selected', host);
            };

            ctrl.removeHost = function (host, index) {
                ctrl.hosts.splice(index, 1);
                HostStore.set('list', ctrl.hosts);
            };

            ctrl.toggleConfig = function (visibility) {
                ctrl.hidden = !visibility;
                HostStore.set('hidden', ctrl.hidden);
            };

            ctrl.send = function (keys) {
                var url = 'http://' + ctrl.model.selectedUrl + '/' + options.api.route;

                $http.post(url, {keys: keys}, {cache: false}).then(function (res) {
                    $log.debug('Success: ', res);
                }, function (err) {
                    $log.debug('Failed: ', err);
                });
            };

            // todo: sorting does not work
            /*
             * There are 621355968000000000 epoch ticks for javascript
             * from Ist Jan 1900 to Ist Jan 1970.
             * And here 10000 are the ticks per milliseconds.*/
            function _toTicks(date) {
                return (date.getTime() * 10000) + 621355968000000000;
            }
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
    })
    .directive('toggleAction', ['$timeout', function ($timeout) {
        return {
            scope: {
                toggleAction: '='
            },
            link: function (scope, elm, attrs, ctrl) {
                if (!scope.toggleAction)
                    throw new Error("Callback and value were not provided.");

                if (!scope.toggleAction.fn)
                    throw new Error("Callback was not provided.");

                var toggleInitialValue = scope.toggleAction.value;
                if (typeof toggleInitialValue !== 'boolean')
                    throw new Error("Value was not provided.");

                $(elm).bootstrapToggle(toggleInitialValue ? 'on' : 'off');

                $(elm).change(function() {
                    $timeout(function () {
                        scope.toggleAction.fn($(elm).prop('checked'));
                    }, 0);
                });
            }
        };
    }]);