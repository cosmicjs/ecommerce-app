(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('WatchProfileCtrl', WatchProfileCtrl);

    function WatchProfileCtrl(UserService, $stateParams, WatchService, Notification, $log, MEDIA_URL, $state) {
        var vm = this;

        vm.getWatch = getWatch;

        function getWatch() {
            function success(response) {
                $log.info(response);
                vm.watch = response.data.object;
            }

            function failed(response) {
                $log.error(response);
            }

            WatchService
                .getWatchBySlug($stateParams.slug)
                .then(success, failed);
        }

    }
})();
