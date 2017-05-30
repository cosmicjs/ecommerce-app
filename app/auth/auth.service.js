(function () {
    'use strict';

    angular
        .module('main')
        .service('AuthService', function ($http, 
                                          $cookieStore, 
                                          $q, 
                                          $rootScope, 
                                          URL, BUCKET_SLUG, READ_KEY, WRITE_KEY) {
            var authService = this;
            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            authService.checkUsername = function (credentials) {
                return $http.get(URL + BUCKET_SLUG + '/object-type/users/search', {
                    params: {
                        metafield_key: 'email',
                        metafield_value_has: credentials.email,
                        limit: 1,
                        read_key: READ_KEY
                    }
                });
            };
            authService.checkPassword = function (credentials) {
                return $http.get(URL + BUCKET_SLUG + '/object-type/users/search', {
                    ignoreLoadingBar: true,
                    params: {
                        metafield_key: 'password',
                        metafield_value: credentials.password,
                        limit: 1,
                        read_key: READ_KEY
                    }
                });
            };
            authService.register = function (user) {

                return $http.post(URL + BUCKET_SLUG + '/add-object', {
                    title: user.full_name,
                    type_slug: 'users',
                    slug: user.username,
                    metafields: [
                        {
                            key: "username",
                            type: "text",
                            value: user.username
                        },
                        {
                            key: "email",
                            type: "text",
                            value: user.email
                        },
                        {
                            key: "full_name",
                            type: "text",
                            value: user.full_name 
                        },
                        {
                            key: "password",
                            type: "text",
                            value: user.password
                        },
                        {
                            key: "image",
                            type: "file",
                            value: "3b2180f0-2c40-11e7-85ac-e98751218524-1493421969_male.png"
                        },
                        {
                            key: "role",
                            type: "radio-buttons",
                            options: [
                                {
                                    value: "ROLE_USER"
                                },
                                {
                                    value: "ROLE_SUPER_ADMIN"
                                }
                            ],
                            value: "ROLE_USER"
                        }
                    ],

                    write_key: WRITE_KEY
                });
            };
            authService.setCredentials = function (user) {
                $rootScope.globals = {
                    currentUser: user
                };
                
                $cookieStore.put('globals', $rootScope.globals);
            };
            authService.clearCredentials = function () {
                var deferred = $q.defer();
                $cookieStore.remove('globals');

                if (!$cookieStore.get('globals')) {
                    $rootScope.globals = {};
                    deferred.resolve('Credentials clear success');
                } else {
                    deferred.reject('Can\'t clear credentials');
                }

                return deferred.promise;
            };
        });  
})();  