ttr.controller('RegisterPageController', function($scope, Auth){
    $scope.phrase = 'hallå där!';

    $scope.fbLogin = function () {

        Auth.useFbLogin();

    };

});
