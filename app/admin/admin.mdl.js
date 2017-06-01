(function () {
    'use strict';
    
    angular
        .module('admin', [
            'admin.watches',
            'admin.orders'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('admin', {
                url: '/admin/',
                abstract: true,
                templateUrl: '../views/admin/admin.html',
                // controller: 'AdminCtrl as admin',
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
    }

})();
 