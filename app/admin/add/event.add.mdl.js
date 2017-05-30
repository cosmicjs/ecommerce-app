(function () {
    'use strict';
    
    angular
        .module('event.add', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider 
            .state('main.event.add', {
                url: '/add', 
                views: {
                    '@main': {
                        templateUrl: '../views/event/event.profile.html',
                        controller: 'EventAddCtrl as vm'
                    }
                },
                data: {
                    is_granted: ['ROLE_USER']
                }
            });
    }
    
})();
 