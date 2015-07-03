
var ttr = angular.module('ttr', ['ngRoute']);


ttr.config(function($routeProvider) {
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


ttr.run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        console.log('routeChangeStart');

        /*if (!Auth.isLoggedIn()) {
            console.log('Inte inloggad!');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            $location.path('/welcome');
        }*/
    });
});


ttr.factory('Auth', function(){
    var user;
    var fbToken;

    return {
        useFbLogin: function(){
            facebookConnectPlugin.login(["email", "user_location"],
                function (userData) {
                    user = userData;

                    facebookConnectPlugin.getAccessToken(function(token) {
                        fbToken = token;
                    }, function(err) {
                        alert("Could not get access token: " + err);
                    });
                },
                function (error) { alert("Error: " + error) }
            );

        },
        logoutUser : function () {
            user = false;

            if (fbToken) {
                facebookConnectPlugin.logout(function(){
                    user = false;
                    fbToken = false;
                }, function(){
                    alert('Could not log out!');
                });
            }
        },
        setUser : function(aUser){
            user = aUser;
        },
        isLoggedIn : function(){
            return(user)? user : false;
        },
        getUser : function () {
            return user;
        }
    }
});

/*
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
