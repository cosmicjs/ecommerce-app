(function () {
    'use strict';
    
    angular
        .module('user.settings', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.user.settings', {
                url: '/settings',
                views: {
                    '@main': {
                        templateUrl: '../views/user/user.settings.html',
                        controller: 'UserSettingsCtrl as vm'
                    }
                },
                data: {
                    is_granted: ['ROLE_USER']
                }
            });
    }
    
})();
 