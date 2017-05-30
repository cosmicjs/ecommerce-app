(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('UserProfileCtrl', UserProfileCtrl);

    function UserProfileCtrl(UserService, $stateParams, EventService, Notification, $log, MEDIA_URL, $state, DEFAULT_EVENT_IMAGE) {
        var vm = this;

        vm.getUser = getUser;
        vm.updateUser = updateUser;
        vm.cancelUpload = cancelUpload;
        vm.upload = upload;

        vm.DEFAULT_EVENT_IMAGE = DEFAULT_EVENT_IMAGE;

        vm.user = {}; 
        vm.flow = {};

        vm.uploadProgress = 0;

        vm.flowConfig = {
            target: MEDIA_URL, 
            singleFile: true
        };
        
        vm.avatar = null;

        function getUser() {
            function success(response) {
                $log.info(response);

                vm.user = response.data.object;

                vm.avatar = response.data.object.metadata.image.url;

                getEvents(vm.user.metadata.username);

            }

            function failed(response) {
                $log.error(response);
            }

            if ($state.is('main.user.myProfile'))
                UserService
                    .getCurrentUser()
                    .then(success, failed);
            else
                UserService
                    .getUser($stateParams.slug)
                    .then(success, failed);
        }
        
        function updateUser(user) {
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

            UserService
                .updateUser(user)
                .then(success, failed);
        }

        function getEvents(username) {
            function success(response) {
                $log.info(response);

                vm.events = response.data.objects;
            }

            function failed(response) {
                $log.error(response);
            }
            console.log(username);

            EventService
                .getEventsByUsername(username, true)
                .then(success, failed);
        }

        function cancelUpload() {
            vm.flow.cancel();
        }

        function upload() {

            EventService
                .upload(vm.flow.files[0].file)
                .then(function(response){

                    vm.user.metafields[4].value = response.media.name;
                    vm.avatar = response.media.url;
                    
                    updateUser(vm.user);
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
