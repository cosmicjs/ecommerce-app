(function () {
    'use strict'; 

    angular
        .module('main')
        .controller('UserSettingsCtrl', UserSettingsCtrl);

    function UserSettingsCtrl(UserService, EventService, Notification, $log, MEDIA_URL, DEFAULT_EVENT_IMAGE) {
        var vm = this;

        vm.getUser = getUser;
        vm.updateUser = updateUser;
        vm.cancelUpload = cancelUpload;
        vm.upload = upload;

        vm.DEFAULT_EVENT_IMAGE = DEFAULT_EVENT_IMAGE;

        vm.flow = {};
        vm.user = {};

        vm.uploadProgress = 0;

        vm.flowConfig = {
            target: MEDIA_URL, 
            singleFile: true
        };
        
        vm.avatar = null;
        vm.settingsForm = null;

        function getUser() {
            function success(response) {
                $log.info(response);

                vm.user = response.data.object;

                vm.avatar = response.data.object.metadata.image.url;

            }

            function failed(response) {
                $log.error(response);
            }

            UserService
                .getCurrentUser()
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

            if (vm.flow.files[0])
                upload();
            else
                if (vm.settingsForm.$valid)
                    UserService
                        .updateUser(user)
                        .then(success, failed);
            }


        function cancelUpload() {
            vm.flow.cancel();
        }

        function upload() {
            if (vm.settingsForm.$valid)
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
            else
                Notification.error('Incorrect values!');

        }

    }
})();
