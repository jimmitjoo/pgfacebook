/*var facebook = {

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

}*/

//var currentUser = false;
//var fbToken = false;
