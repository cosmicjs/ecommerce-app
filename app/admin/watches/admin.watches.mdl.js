(function () {
    'use strict';
    
    angular
        .module('admin.watches', [
            'admin.watches.edit',
            'admin.watches.add'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin.watches', {
                url: 'watches?key&value',
                templateUrl: '../views/admin/admin.watches.html',
                controller: 'WatchCtrl as vm',
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
    }
    
})();
 