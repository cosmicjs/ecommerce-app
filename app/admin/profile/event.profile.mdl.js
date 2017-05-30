(function () {
    'use strict';
    
    angular
        .module('event.profile', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.event.profile', {
                url: '/slugs/:slug',
                views: {
                    '@main': {
                        templateUrl: '../views/event/event.profile.html',
                        controller: 'EventProfileCtrl as vm'
                    }
                },
                data: {
                    is_granted: ['ROLE_USER']
                }
            });
    }
    
})();
 