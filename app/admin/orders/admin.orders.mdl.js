(function () {
    'use strict';
    
    angular
        .module('admin.orders', [
            'admin.orders.preview'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin.orders', {
                url: 'orders?key&value',
                templateUrl: '../views/admin/admin.orders.html',
                controller: 'AdminOrdersCtrl as vm',
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
        
        
    }
    
})();
 