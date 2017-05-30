(function () {
    'use strict';
    
    angular
        .module('admin', [
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('admin', {
                url: '/admin/',
                abstract: false,
                templateUrl: '../views/admin/admin.html',
                controller: 'AdminCtrl as admin',
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
    }
    
})();
 