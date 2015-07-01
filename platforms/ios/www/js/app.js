var api = {

    baseUrl: function(){
        return 'http://timetorun.se/api';
    },

    call: function (request) {
        var xhr;
        var dataList;
        xhr = new XMLHttpRequest();

        xhr.open('GET', this.baseUrl + '?' + request + '&callback=api.callback',  true);
        xhr.send();

        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4){
                console.log(dataList);
            }
        };
    },

    callback: function (data) {
        alert(data);
    }


}

var facebook = {

    login: function () {
        facebookConnectPlugin.login(["email", "user_location"],
            facebook.loginSuccess,
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

var currentUser = false;
var fbToken = false;
