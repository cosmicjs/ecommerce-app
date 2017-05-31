(function () {
    'use strict';
    
    angular
        .module('cart.checkout', [])
        .config(config); 

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.cart.checkout', {
                url: '/checkout',
                views: {
                    '@main': {
                        templateUrl: '../views/cart/cart.checkout.html'
                    }
                }
            });
    }
})();
 