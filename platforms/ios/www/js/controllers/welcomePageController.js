ttr.controller('WelcomePageController', function($scope, Auth){
    $scope.phrase = 'hallå där!';


    $scope.auth = Auth.getUser();

});
