(function () {
    'use strict';
    
    angular
        .module('cart', [
            'cart.checkout'
        ])
        .config(config); 

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
 
        $stateProvider
            .state('main.cart', {
                url: 'cart',
                templateUrl: '../views/cart/cart.html'
            });
    }
})();
 