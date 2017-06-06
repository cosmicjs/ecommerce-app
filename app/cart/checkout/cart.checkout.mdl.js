(function () {
    'use strict';
    
    angular
        .module('cart.checkout', [])
        .config(config); 

    config.$inject = ['$stateProvider', 'StripeCheckoutProvider'];
    function config($stateProvider, StripeCheckoutProvider) {
 
        $stateProvider
            .state('main.cart.checkout', {
                url: '/checkout',
                views: {
                    '@main': {
                        templateUrl: '../views/cart/cart.checkout.html'
                    }
                }
            })
            .state('main.cart.thankYou', {
                url: '/thank-you',
                views: {
                    '@main': {
                        templateUrl: '../views/cart/cart.thank-you.html'
                    }
                }
            });
    }
})();
 