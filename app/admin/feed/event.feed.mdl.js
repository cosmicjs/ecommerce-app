(function () {
    'use strict';
    
    angular
        .module('event.feed', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.event.feed', {
                url: '/feed',
                views: {
                    '@main': {
                        templateUrl: '../views/event/event.feed.html',
                        controller: 'EventFeedCtrl as vm'
                    }
                },
                data: {
                    is_granted: ['ROLE_ADMIN']
                }
            });
    }
    
})();
 