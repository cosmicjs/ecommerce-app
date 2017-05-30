(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('EventFeedCtrl', EventFeedCtrl);

    function EventFeedCtrl(EventService, Notification, $log, DEFAULT_EVENT_IMAGE) {
        var vm = this;

        vm.getEvents = getEvents;
        vm.removeEvent = removeEvent;
        vm.DEFAULT_EVENT_IMAGE = DEFAULT_EVENT_IMAGE;

        function getEvents() {
            function success(response) {
                $log.info(response);
                vm.events = response.data.objects;
            }

            function failed(response) {
                $log.error(response);
            }

            EventService
                .getEvents()
                .then(success, failed);
        }

        function removeEvent(slug) {
            function success(response) {
                $log.info(response);

                Notification.success('Deleted');
            }

            function failed(response) {
                Notification.error(response.data.message);
                
                $log.error(response);
            }



            EventService
                .removeEvent(slug)
                .then(success, failed);
        }
    }
})();
