ttr.controller('ApplicationController', function($scope, $location, Auth){

    $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {

        if (!value && oldValue) {
            $location.path('/login');
        }

        if (value) {
            console.log("Connect");
        }

    });
}, true);
