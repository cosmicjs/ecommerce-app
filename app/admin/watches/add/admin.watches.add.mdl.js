(function () {
    'use strict';
    
    angular
        .module('admin.watches.add', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin.watches.add', {
                url: '/add',
                onEnter: [
                'ngDialog',
                'WatchService',
                '$stateParams',
                '$state',
                '$log',
                function (ngDialog, WatchService, $stateParams, $state, $log) {
                    openDialog(WatchService.watch);
                        
                    function openDialog(data) {
    
                        var options = {
                            templateUrl: '../views/admin/admin.watches.edit.html',
                            data: data,
                            controller: 'AdminWatchesAdd as vm',
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
 