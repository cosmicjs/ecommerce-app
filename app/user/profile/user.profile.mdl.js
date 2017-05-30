(function () {
    'use strict';
    
    angular
        .module('user.profile', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.user.profile', {
                url: '/profile/:slug',
                views: {
                    '@main': {
                        templateUrl: '../views/user/user.profile.html',
                        controller: 'UserProfileCtrl as vm'
                    }
                },
                data: {
                    is_granted: ['ROLE_USER']
                }
            })
            .state('main.user.myProfile', {
                url: '/my-profile',
                views: {
                    '@main': {
                        templateUrl: '../views/user/user.profile.html',
                        controller: 'UserProfileCtrl as vm'
                    }
                },
                data: {
                    is_granted: ['ROLE_USER']
                }
            });
    }
    
})();
 