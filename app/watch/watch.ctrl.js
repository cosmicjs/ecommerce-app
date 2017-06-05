(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('WatchCtrl', WatchCtrl);

    function WatchCtrl($stateParams, WatchService, Notification, $log, MEDIA_URL, $state) {
        var vm = this;

        vm.getWatches = getWatches;
        vm.removeWatch = removeWatch;

        vm.params = $stateParams;

        vm.categories = [];
        vm.brands = [];
        vm.case_sizes = [];
        vm.colors = [];
        
        vm.watches = [];
        
        function getWatches() {
            function success(response) {
                $log.info(response);

                vm.watches = response.data.objects;

            }

            function failed(response) {
                $log.error(response);
            }

            function params(response) {
                response.data.objects.forEach(function (item) {
                    if (vm.categories.indexOf(item.metadata.category) === -1)
                        vm.categories.push(item.metadata.category);
                    if (vm.brands.indexOf(item.metadata.brand) === -1)
                        vm.brands.push(item.metadata.brand);
                    if (vm.case_sizes.indexOf(item.metadata.case_size) === -1)
                        vm.case_sizes.push(item.metadata.case_size);
                    if (vm.colors.indexOf(item.metadata.color) === -1)
                        vm.colors.push(item.metadata.color)
                });
            }

            WatchService
                .getWatches($stateParams)
                .then(success, failed);

            WatchService
                .getWatchesParams()
                .then(params);
        }

        function removeWatch(slug) {
            function success(response) {
                $log.info(response);
                getWatches();
                Notification.success('Removed!');
            }

            function failed(response) {
                $log.error(response);
            }
            
            WatchService
                .removeWatch(slug)
                .then(success, failed);

        }

    }
})();
