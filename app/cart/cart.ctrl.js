(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('CartCtrl', CartCtrl);

    function CartCtrl(CartService, WatchService, Notification, $log, MEDIA_URL, $state) {
        var vm = this;

        vm.addToCart = addToCart;
        vm.getCart = getCart;
        vm.hasInCart = hasInCart;
        vm.removeFromCart = removeFromCart;
        vm.completeOrder = completeOrder;

        vm.cart = {};
        vm.cart.order = {};
        vm.watches = [];
        vm.totalPrice = 0;
        vm.orderForm = null;

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
                Notification.success('Success');

            }

            function failed(response) {
                Notification.error(response.data.message);
            }

            if (vm.orderForm)
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
