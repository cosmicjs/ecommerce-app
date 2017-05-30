(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('EventAddCtrl', EventAddCtrl);

    function EventAddCtrl(EventService, Notification, $state, $log, $scope, MEDIA_URL, DEFAULT_EVENT_IMAGE, $timeout) {
        var vm = this;

        vm.createEvent = createEvent;
        vm.cancelUpload = cancelUpload;
        vm.upload = upload;

        vm.dateBeginPicker = false;
        vm.dateEndPicker = false;
        vm.contentEditor = true;
        vm.uploadProgress = 0;

        vm.event = {
            title: null,
            slug: null,
            content: null,
            metafields: [
                {
                    key: "image",
                    type: "file",
                    value: null
                },
                {
                    key: "date_begin",
                    type: "date",
                    value: null
                },
                {
                    key: "date_end",
                    type: "date",
                    value: null
                },
                {
                    key: "type",
                    type: "select-dropdown",
                    options: [
                        {
                            key: "social",
                            value: "Social"
                        },
                        {
                            key: "fun",
                            value: "Fun"
                        }
                    ],
                    value: "Social"
                }
            ]
        };

        $timeout(function() {
            vm.event.metafields[1].value = new Date();
            vm.event.metafields[2].value = new Date();
        }, 100);

        vm.flow = {};
        vm.background = {
            'background-image': 'url(' + DEFAULT_EVENT_IMAGE + ')'
        };
        
        vm.flowConfig = {
            target: MEDIA_URL, 
            singleFile: true
        };

        function createEvent() {
            if (vm.flow.files[0])
                upload();
            else
                _createEvent(vm.event);
        }
        
        function _createEvent(event) {
            function success(response) {
                $log.info(response);

                Notification.success(
                    {
                        message: 'Created',
                        delay: 800,
                        replaceMessage: true
                    }
                );

                $state.go('main.event');
            }

            function failed(response) {
                Notification.error(
                    {
                        message: response.data.error,
                        delay: 4000,
                        replaceMessage: true
                    }
                );

                $log.error(response);
            }

            EventService
                .createEvent(event)
                .then(success, failed);
        }

        function cancelUpload() {
            vm.flow.cancel();
            vm.background = {
                'background-image': 'url(' + DEFAULT_EVENT_IMAGE.url + ')'
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

                    createEvent(vm.event);

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
