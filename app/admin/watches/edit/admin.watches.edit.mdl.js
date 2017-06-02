(function () {
    'use strict';
    
    angular
        .module('admin.watches.edit', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin.watches.edit', {
                url: '/edit/:slug',
                onEnter: [
                'ngDialog',
                'WatchService',
                '$stateParams',
                '$state',
                '$log',
                function (ngDialog, WatchService, $stateParams, $state, $log) {
                    getWatch($stateParams.slug);
    
                    function getWatch(slug) {
                        function success(response) {
                            openDialog(response.data.object);
                        }
    
                        function failed(response) {
                            $log.error(response);
                        }
 
                        WatchService
                            .getWatchBySlug(slug)
                            .then(success, failed);
                    }
    
                    function openDialog(data) {
    
                        var options = {
                            templateUrl: '../views/admin/admin.watches.edit.html',
                            data: data,
                            controller: 'AdminWatchesEdit as vm',
                            showClose: true
                        };
    
                        ngDialog.open(options).closePromise.finally(function () {
                            $state.go('admin.watches');
                        });
                    }
                }],
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
    }
    
})();
 