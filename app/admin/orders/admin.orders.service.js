(function () {
    'use strict';

    angular
        .module('main')
        .service('AdminOrdersService', function ($http,
                                          $cookieStore, 
                                          $q, 
                                          $rootScope,
                                          URL, BUCKET_SLUG, READ_KEY, WRITE_KEY, MEDIA_URL) {
            
            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            this.getOrders = function () {
                return $http.get(URL + BUCKET_SLUG + '/object-type/orders', {
                    params: {
                        limit: 100,
                        read_key: READ_KEY
                    }
                });
            };
            this.getOrderBySlug = function (slug) {
                return $http.get(URL + BUCKET_SLUG + '/object/' + slug, {
                    params: {
                        read_key: READ_KEY
                    }
                });
            };

            this.updateEvent = function (event) {
                event.write_key = WRITE_KEY;

                return $http.put(URL + BUCKET_SLUG + '/edit-object', event);
            };
            this.removeOrder = function (slug) {
                return $http.delete(URL + BUCKET_SLUG + '/' + slug, {
                    ignoreLoadingBar: true,
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    data: {
                        write_key: WRITE_KEY
                    }
                });
            };
            this.createEvent = function (event) {
                event.write_key = WRITE_KEY;

                var beginDate = new Date(event.metafields[1].value);
                var endDate = new Date(event.metafields[2].value);

                event.metafields[1].value = beginDate.getFullYear() + '-' + (beginDate.getMonth() + 1) + '-' + beginDate.getDate();
                event.metafields[2].value = endDate.getFullYear() + '-' + (beginDate.getMonth() + 1) + '-' + endDate.getDate();

                event.slug = event.title;
                event.type_slug = 'events';

                event.metafields[4] = {
                    key: "user",
                    type: "object",
                    object_type: "users",
                    value: $rootScope.globals.currentUser._id
                };
                return $http.post(URL + BUCKET_SLUG + '/add-object', event);
            };
            this.upload = function (file) {
                var fd = new FormData(); 
                fd.append('media', file);
                fd.append('write_key', WRITE_KEY);

                var defer = $q.defer();

                var xhttp = new XMLHttpRequest();

                xhttp.upload.addEventListener("progress",function (e) {
                    defer.notify(parseInt(e.loaded * 100 / e.total));
                });
                xhttp.upload.addEventListener("error",function (e) {
                    defer.reject(e);
                });

                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState === 4) {
                        defer.resolve(JSON.parse(xhttp.response)); //Outputs a DOMString by default
                    }
                };

                xhttp.open("post", MEDIA_URL, true);

                xhttp.send(fd);
                
                return defer.promise;
            }
        });
})();  