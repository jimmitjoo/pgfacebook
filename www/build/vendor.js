/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        /*
        angular.element(document).ready(function() {
            angular.bootstrap(document);
        });
        */
    }

};


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

ttr.controller('LoginPageController', function($scope){
    $scope.phrase = 'hallå där!';




});

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

ttr.controller('StartPageController', function($scope){
    $scope.phrase = 'hallå där!';



    
});

ttr.controller('WelcomePageController', function($scope, Auth){
    $scope.phrase = 'hallå där!';


    $scope.auth = Auth.getUser();

});

var facebook = {

    login: function () {
        facebookConnectPlugin.login(["email", "user_location"],
            this.loginSuccess,
            function (error) { alert("Error: " + error) }
        );
    },

    logout: function () {
        facebookConnectPlugin.logout(function(){
            currentUser = false;
            fbToken = false;
        }, function(){
            alert('Could not log out!');
        });
    },

    loginSuccess: function (userData) {

        currentUser = userData;

        facebookConnectPlugin.getAccessToken(function(token) {
            fbToken = token;
        }, function(err) {
            alert("Could not get access token: " + err);
        });
    },

    isLoggedIn: function() {
        alert(fbToken);
    }

}

//var currentUser = false;
//var fbToken = false;
