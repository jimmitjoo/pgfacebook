ttr.controller('RegisterPageController', function($scope, $http, $location, Auth){
    $scope.phrase = 'hallå där!';

    $scope.fbLogin = function () {

        Auth.useFbLogin();

    };

    $scope.user = {}

    $scope.user.username = '';
    $scope.user.name = '';
    $scope.user.email = '';
    $scope.user.gender = '';
    $scope.user.password = '';
    $scope.user.town = '';

    $scope.regNewUser = function() {

        //console.log($scope.user);

        var request = {
            method: 'POST',
            url: 'http://timetorun.se/api/user',
            data: $scope.user
        };

        $http(request).success(function(data){

            if (data.status) return alert(data.message);

            Auth.setUser(data);

            $location.path('/welcome');

        }).error(function(error){

            console.log('ERROR!');
            console.log(error);

        });

    }

});

/*
ttr.controller('RegisterFormController', function($scope, $http){



});
*/
