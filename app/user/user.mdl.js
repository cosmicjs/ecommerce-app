(function () {
    'use strict';
    
    angular
        .module('user', [
            'user.profile',
            'user.settings'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.user', {
                url: 'user',
                abstract: true,
                data: {
                    is_granted: ['ROLE_USER']
                }
            });
    }
})();
 