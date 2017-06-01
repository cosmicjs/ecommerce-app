(function () {
    'use strict';
    
    angular
        .module('admin.orders.preview', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('admin.orders.preview', {
                url: '/preview/:slug',
                data: {
                    is_granted: ['ROLE_ADMIN']
                },
                onEnter: [
                    'ngDialog',
                    'AdminOrdersService',
                    '$stateParams',
                    '$state',
                    '$log',
                    function (ngDialog, AdminOrdersService, $stateParams, $state, $log) {
                        getOrder($stateParams.slug);

                        function getOrder(slug) {
                            function success(response) {
                                openDialog(response.data.object);
                            }

                            function failed(response) {
                                $log.error(response);
                            }

                            AdminOrdersService
                                .getOrderBySlug(slug)
                                .then(success, failed);
                        }

                        function openDialog(data) {

                            var options = {
                                templateUrl: '../views/admin/admin.orders.preview.html',
                                data: data,
                                showClose: true
                            };

                            ngDialog.open(options).closePromise.finally(function () {
                                $state.go('admin.orders');
                            });
                        }
                    }]
            });
    }
})();
 