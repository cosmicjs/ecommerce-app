(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('AdminWatchesEdit', AdminWatchesEdit);

    function AdminWatchesEdit($state, WatchService, Notification, $log, $scope, MEDIA_URL, ngDialog) {
        var vm = this;

        vm.getEvent = getEvent;
        vm.updateWatch = updateWatch;
        vm.cancelUpload = cancelUpload;
        vm.upload = upload;

        vm.dateBeginPicker = false;
        vm.dateEndPicker = false;
        vm.contentEditor = false;
        vm.uploadProgress = [0, 0, 0];

        vm.event = {};
        vm.flow = {};
        vm.background = {};

        vm.flowConfig = {
            target: MEDIA_URL,
            singleFile: false
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
            //
            // EventService
            //     .getEventById($stateParams.slug)
            //     .then(success, failed);
        }
        
        function updateWatch(watch) {
            function success(response) {
                $log.info(response);

                Notification.primary(
                    {
                        message: 'Saved',
                        delay: 800,
                        replaceMessage: true
                    }
                );

                $state.go('admin.watches', null, {reload: true});
                ngDialog.close();
            }

            function failed(response) {
                $log.error(response);
            }


            if (vm.flow.files.length &&
                vm.uploadProgress[0] === 100 &&
                vm.uploadProgress[1] === 100 &&
                vm.uploadProgress[2] === 100)
                WatchService
                    .updateWatch(watch)
                    .then(success, failed);
            else
                WatchService
                    .updateWatch(watch)
                    .then(success, failed);
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
                    vm.image = {
                        'background-image': 'url(' + event.target.result + ')'
                    };
                });
            };
        });

        function upload() {
            vm.flow.files.forEach(function (item, i) {
                if (i < 3)
                    WatchService
                        .upload(item.file)
                        .then(function(response){

                            $scope.ngDialogData.metafields[11].children[i].value = response.media.name;

                        }, function(){
                            console.log('failed :(');
                        }, function(progress){
                            vm.uploadProgress[i] = progress;
                        });
            });

        }

    }
})();
