(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('CartCtrl', CartCtrl);

    function CartCtrl(CartService, WatchService, $cookies, $http, Notification, STRIPE_KEY, $log, $state, StripeCheckout) {
        var vm = this;

        vm.addToCart = addToCart;
        vm.getCart = getCart;
        vm.hasInCart = hasInCart;
        vm.removeFromCart = removeFromCart;
        vm.completeOrder = completeOrder;
        vm.stripeCheckout = stripeCheckout;

        vm.cart = {};
        vm.cart.order = {};
        vm.watches = [];
        vm.totalPrice = 0;
        vm.orderForm = null;

        var handler = StripeCheckout.configure({
            key: STRIPE_KEY,
            image: 'https://cosmicjs.com/images/logo.svg',
            locale: 'auto',
            token: function(token) {
            }
        });

        window.addEventListener('popstate', function() {
            handler.close();
        });
        
        function stripeCheckout(order) {
            if (vm.orderForm.$valid) {
                handler.open({
                    name: 'Ecommerce App',
                    description: vm.watches.length + ' watches',
                    amount: vm.totalPrice * 100
                }).then(function(result) {
                    console.log("Order complete!");
                    $http.post('/charge', {
                        stripeToken: result[0].id,
                        description: vm.watches.length + ' watches',
                        amount: vm.totalPrice * 100,
                        order: order
                    }).then(function () {
                        completeOrder(order);
                    });
                },function() {
                    console.log("Stripe Checkout closed without making a sale :(");
                });
            }
        }

        function addToCart(item) {
            function success(response) {
                Notification.success(response);
                getCart();

            }

            function failed(response) {
                Notification.error(response);
            }

            CartService
                .addToCart(item)
                .then(success, failed);

        }

        function completeOrder(order) {
            order.watches = vm.watches;

            function success(response) {
                $cookies.remove('cart');
                getCart();
                $state.go('main.cart.thankYou');
            }

            function failed(response) {
                Notification.error(response.data.message);
            }

            if (vm.orderForm.$valid)
                CartService
                    .completeOrder(order)
                    .then(success, failed);
        }

        function removeFromCart(_id) {
            function success(response) {
                Notification.success(response);
                getCart();
            }

            function failed(response) {
                Notification.error(response);
            }

            CartService
                .removeFromCart(_id)
                .then(success, failed);

        }

        function hasInCart(_id) {
            return CartService.hasInCart(_id);
        }

        function getCart() {
            function success(response) {
                vm.cart = response;
                getWatches();

                $log.info(response);
            }

            function failed(response) {
                $log.error(response);
            }

            CartService
                .getCart()
                .then(success, failed);

        }

        function getWatches() {
            function success(response) {
                $log.info(response);

                vm.watches = [];
                vm.totalPrice = 0;

                for (var _id in vm.cart)
                    response.data.objects.forEach(function (item) {
                        if (item._id === _id) {
                            vm.watches.push(item);
                            vm.totalPrice += item.metadata.price;
                        }
                    });

            }

            function failed(response) {
                $log.error(response);
            }

            WatchService
                .getWatches({})
                .then(success, failed);

        }



    }
})();
