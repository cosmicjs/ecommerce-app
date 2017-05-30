(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('EventProfileCtrl', EventProfileCtrl);

    function EventProfileCtrl($stateParams, EventService, Notification, $log, $scope, MEDIA_URL, $rootScope, DEFAULT_EVENT_IMAGE) {
        var vm = this;

        vm.getEvent = getEvent;
        vm.updateEvent = updateEvent;
        vm.cancelUpload = cancelUpload;
        vm.upload = upload;

        vm.dateBeginPicker = false;
        vm.dateEndPicker = false;
        vm.contentEditor = false;
        vm.uploadProgress = 0;
        
        vm.event = {}; 
        vm.flow = {};
        vm.background = {};
        
        vm.flowConfig = {
            target: MEDIA_URL, 
            singleFile: true
        };

        function getEvent() {
            function success(response) {
                $log.info(response);

                vm.event = response.data.object;

                vm.event.metafields[1].value = new Date(response.data.object.metadata.date_begin);
                vm.event.metafields[2].value = new Date(response.data.object.metadata.date_end);

                vm.contentEditor = !vm.event.content;

                vm.background = {
                    'background-image': 'url(' + (vm.event.metafields[0].value ? vm.event.metafields[0].url : DEFAULT_EVENT_IMAGE) + ')'
                };

                // vm.event.content = $sce.trustAsHtml(response.data.object.content);
            }

            function failed(response) {
                $log.error(response);
            }

            EventService
                .getEventById($stateParams.slug)
                .then(success, failed);
        }
        
        function updateEvent(event) {
            function success(response) {
                $log.info(response);

                Notification.primary(
                    {
                        message: 'Saved',
                        delay: 800,
                        replaceMessage: true
                    }
                );
            }

            function failed(response) {
                $log.error(response);
            }

            if ($rootScope.globals.currentUser._id === event.metadata.user._id)
                EventService
                    .updateEvent(event)
                    .then(success, failed);
            else
                Notification.warning("You can't update");
        }

        function cancelUpload() {
            vm.flow.cancel();
            vm.background = {
                'background-image': 'url(' + (vm.event.metafields[0].value ? vm.event.metafields[0].url : DEFAULT_EVENT_IMAGE) + ')'
            };
        }

        $scope.$watch('vm.flow.files[0].file.name', function () {
            if (!vm.flow.files[0]) {
                return ;
            }
            var fileReader = new FileReader();
            fileReader.readAsDataURL(vm.flow.files[0].file);
            fileReader.onload = function (event) {
                $scope.$apply(function () {
                    vm.background = {
                        'background-image': 'url(' + event.target.result + ')'
                    };
                });
            };
        });

        function upload() {

            EventService
                .upload(vm.flow.files[0].file)
                .then(function(response){

                    vm.event.metafields[0].value = response.media.name;

                    updateEvent(vm.event);
                    vm.flow.cancel();
                    vm.uploadProgress = 0;

                }, function(){
                    console.log('failed :(');
                }, function(progress){
                    vm.uploadProgress = progress;
                });

        }

    }
})();
