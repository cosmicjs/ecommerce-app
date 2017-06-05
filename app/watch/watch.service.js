(function () {
    'use strict';

    angular
        .module('main')
        .service('WatchService', function ($http,
                                          $cookieStore, 
                                          $q, 
                                          $rootScope,
                                          URL, BUCKET_SLUG, READ_KEY, WRITE_KEY, MEDIA_URL) {
            
            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            this.watch = {
                title: null,
                type_slug: 'watches',
                content: null,
                metafields: [
                    {
                        key: "category",
                        title: "Category",
                        type: "text",
                        value: null
                    },
                    {
                        key: "brand",
                        title: "Brand",
                        type: "text",
                        value: null
                    },
                    {
                        key: "case_size",
                        title: "Case Size",
                        type: "text",
                        value: null
                    },
                    {
                        key: "case_thickness",
                        title: "Case Thickness",
                        type: "text",
                        value: null
                    },
                    {
                        key: "strap_width",
                        title: "Strap Width",
                        type: "text",
                        value: null
                    },
                    {
                        key: "movement",
                        title: "Movement",
                        type: "text",
                        value: null
                    },
                    {
                        key: "glass",
                        title: "Glass",
                        type: "text",
                        value: null
                    },
                    {
                        key: "water_resistance",
                        title: "Water Resistance",
                        type: "text",
                        value: null
                    },
                    {
                        key: "color",
                        title: "Color",
                        type: "text",
                        value: null
                    },
                    {
                        key: "strap_material",
                        title: "Strap Material",
                        type: "text",
                        value: null
                    },
                    {
                        key: "price",
                        title: "Price",
                        type: "text",
                        value: null
                    },
                    {
                        key: "images",
                        title: "Images",
                        type: "parent",
                        value: "",
                        children: [
                            {
                                key: "image_1",
                                title: "Image_1",
                                type: "file"
                            },
                            {
                                key: "image_2",
                                title: "Image_2",
                                type: "file"
                            },
                            {
                                key: "image_3",
                                title: "Image_3",
                                type: "file"
                            }
                        ]
                    }
                ]
            };

            this.getWatches = function (params) {
                if (!angular.equals({}, params))
                    return $http.get(URL + BUCKET_SLUG + '/object-type/watches/search', {
                        params: {
                            metafield_key: params.key,
                            metafield_value_has: params.value,
                            limit: 100,
                            read_key: READ_KEY
                        }
                    });
                else
                    return $http.get(URL + BUCKET_SLUG + '/object-type/watches', {
                        params: {
                            limit: 100,
                            read_key: READ_KEY
                        }
                    });
            };
            this.getWatchesParams = function () {
                return $http.get(URL + BUCKET_SLUG + '/object-type/watches', {
                    params: {
                        limit: 100,
                        read_key: READ_KEY
                    }
                });
            };
            this.getWatchBySlug = function (slug) {
                return $http.get(URL + BUCKET_SLUG + '/object/' + slug, {
                    params: {
                        read_key: READ_KEY
                    }
                });
            };
            this.updateWatch = function (event) {
                event.write_key = WRITE_KEY;

                return $http.put(URL + BUCKET_SLUG + '/edit-object', event);
            };
            this.removeWatch = function (slug) {
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
            this.createWatch = function (watch) {
                watch.write_key = WRITE_KEY;
                
                return $http.post(URL + BUCKET_SLUG + '/add-object', watch);
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