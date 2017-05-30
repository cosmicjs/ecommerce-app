(function () {
    'use strict';
    
    angular
        .module('main', [
            'ui.router', 
            'ui.bootstrap',
            'ngMask',
            'ngCookies',
            'ngRoute',
            'ngDialog',
            'cr.acl',
            'ui-notification',
            'ngFlash',
            'textAngular',
            'flow',
            'angular-loading-bar',
            'hl.sticky',
 
            'watch',
            'cart',
            
            'config'
        ])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', 'NotificationProvider'];
    function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, NotificationProvider) {
        cfpLoadingBarProvider.includeSpinner = false;

        NotificationProvider.setOptions({
            startTop: 25,
            startRight: 25,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            var $location = $injector.get("$location");
            var crAcl = $injector.get("crAcl");

            var state = "";

            switch (crAcl.getRole()) {
                case 'ROLE_ADMIN':
                    state = 'admin';
                    break;
            }

            if (state) $state.go(state);
            else $location.path('/');
        });
 
        $stateProvider
            .state('main', {
                url: '/',
                abstract: true,
                templateUrl: '../views/main.html',
                controller: 'CartCtrl as cart',
                data: {
                    is_granted: ['ROLE_GUEST']
                }
            })
            .state('blog', {
                url: '/blog',
                templateUrl: '../blog.html',
                data: {
                    is_granted: ['ROLE_USER']
                }
            })
            .state('auth', {
                url: '/login',
                templateUrl: '../views/auth/login.html',
                controller: 'AuthCtrl as auth',
                onEnter: ['AuthService', function(AuthService) {
                    AuthService.clearCredentials();
                }],
                data: {
                    is_granted: ['ROLE_GUEST']
                }
            });
    } 

    run.$inject = ['$rootScope', '$cookieStore', '$http', 'crAcl'];

    function run($rootScope, $cookieStore, $http, crAcl) {
        // $rootScope.globals = $cookieStore.get('globals') || {};
        // $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        //
        // crAcl
        //     .setInheritanceRoles({
        //         'ROLE_ADMIN': ['ROLE_ADMIN', 'ROLE_GUEST'],
        //         'ROLE_USER': ['ROLE_USER', 'ROLE_GUEST'],
        //         'ROLE_GUEST': ['ROLE_GUEST']
        //     });
        //
        crAcl.setRedirect('main.watch');
        crAcl.setRole();

        
    }

})();
 