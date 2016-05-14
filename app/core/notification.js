(function (angular) {
    'use strict';

    var module = angular.module('handlio.client.core');
    module.factory('notification', _notification);

    _notification.$inject = ['$log', 'toastr'];

    function _notification($log, toastr) {

        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;

        return {
            showToasts: true,

            error   : _error,
            info    : _info,
            success : _success,
            warning : _warning,

            // straight to console; bypass toastr
            log     : $log.log
        };

        // private functions

        function _error(message, title, data) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function _info(message, title, data) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function _success(message, title, data) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function _warning(message, title, data) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }
    }

})(angular);