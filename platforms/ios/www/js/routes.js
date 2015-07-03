
var ttr = angular.module('ttr', ['ngRoute']);


ttr.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'start.html',
        controller: 'StartPageController'
    })
    .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginPageController'
    })
    .when('/register', {
        templateUrl: 'register.html',
        controller: 'RegisterPageController'
    })
    .when('/welcome', {
        templateUrl: 'welcome.html',
        controller: 'WelcomePageController'
    })
    .otherwise({
        redirectTo: '/'
    });

});

/*
ttr.run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
    if (next.$$route) {
      var user = $rootScope.user
      var auth = next.$$route.auth
      if (auth && !auth(user)) { $location.path('/') }
    }
  })
});

ttr.factory('auth', function ($rootScope) {
    $rootScope.user = user;
});


var checkRouting = function ($location) {

    if (facebook.isLoggedIn) {
        return true;
    } else {
        $location.path("/");
        return false;
    }
};
*/

ttr.directive('backButton', function(){
    return {
      restrict: 'A',

      link: function(scope, element, attrs) {
        element.bind('click', goBack);

        function goBack() {
          history.back();
          scope.$apply();
        }
      }
    }
});


ttr.directive('fbLogin', function(){
    return {
      restrict: 'A',

      link: function(scope, element, attrs) {
        element.bind('click', goFbLogin);

        function goFbLogin() {
            alert('yo!');
            facebook.login();
        }
      }
    }
});

ttr.directive('fbLogout', function(){
    return {
      restrict: 'A',

      link: function(scope, element, attrs) {
        element.bind('click', fbLogout);

        function fbLogout() {
          facebook.logout();
        }
      }
    }
});
