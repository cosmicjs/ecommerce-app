(function () {
    'use strict';

    angular
        .module('main')
        .service('CartService', function ($http, 
                                          $cookieStore, 
                                          $q, 
                                          $rootScope,
                                          URL, BUCKET_SLUG, READ_KEY, WRITE_KEY) {
            var that = this;
            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            
            that.addToCart = function (item) {
                var deferred = $q.defer();

                var cart = $cookieStore.get('cart');
                cart = cart ? cart : {};

                if (!(item._id in cart)) {
                    cart[item._id] = item._id;

                    $cookieStore.put('cart', cart);

                    deferred.resolve('Added to cart');
                } else {
                    deferred.reject('Error: Can\'t added to cart');
                }

                return deferred.promise;
            };

            that.getCart = function () {
                var deferred = $q.defer();
                var cart = $cookieStore.get('cart');

                if (cart) {
                    deferred.resolve(cart);
                } else {
                    deferred.reject('Error: Can\'t get cart');
                }

                return deferred.promise;
            };

            that.removeFromCart = function (_id) {
                var deferred = $q.defer();

                var cart = $cookieStore.get('cart');
                cart = cart ? cart : {};

                if (_id in cart) {
                    delete cart[_id];

                    $cookieStore.put('cart', cart);

                    deferred.resolve('Removed from cart');
                } else {
                    deferred.reject('Error: Can\'t remove from cart');
                }

                return deferred.promise;
            };

            that.hasInCart = function (_id) {
                var cart = $cookieStore.get('cart');
                cart = cart ? cart : {};

                return _id in cart;
            };

            that.completeOrder = function (order) {
                var watches = [];

                order.watches.forEach(function (item) {
                    watches.push(item._id);
                });

                return $http.post(URL + BUCKET_SLUG + '/add-object/', {
                    write_key: WRITE_KEY,
                    title: order.firstName + ' ' + order.lastName,
                    type_slug: "orders",
                    metafields: [
                        {
                            key: "first_name",
                            type: "text",
                            value: order.firstName

                        },
                        {
                            key: "last_name",
                            type: "text",
                            value: order.lastName

                        },
                        {
                            key: "address",
                            type: "text",
                            value: order.address

                        },
                        {
                            key: "city",
                            type: "text",
                            value: order.city

                        },
                        {
                            key: "phone",
                            type: "text",
                            value: order.phone

                        },
                        {
                            key: "postal_code",
                            type: "text", 
                            value: order.postalCode

                        },
                        {
                            key: "email",
                            type: "text",
                            value: order.email
                        },
                        {
                            key: "watches",
                            type: "objects",
                            object_type: "watches",
                            value: watches.join()
                        }
                    ]
                });
            };
        });  
})();  