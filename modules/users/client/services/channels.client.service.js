(function () {
  'use strict';
  // Users service used for communicating with the users REST endpoint
  angular
    .module('users.services')
    .factory('ChannelsService', ChannelsService);

  ChannelsService.$inject = ['$resource', '$http'];

  function ChannelsService($resource, $http) {
    var Channels = $resource('/api/channels', {}, {
      update: {
        method: 'PUT'
      }
    });


    angular.extend(Channels, {
      loadChannels: function () {
        return getChannels($http);
      },
      getChannelUrl: function (channelId) {
        return getChannelUrl($http, channelId);
      }

    });
    return Channels;
  }

  function loginToMiddleware() {
    var LOGIN_URL = 'http://eu.xservers.cloud:8888/interface/auth/token.php';
    var username = 'alen';
    var password = 'Fahro1990';
    return new Promise(function (response) {

      var xhr = new XMLHttpRequest();
      var formData = 'grant_type=password&username=' + username + '&password=' + password + '&client_type=pc';
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var loginResponse = JSON.parse(xhr.response);
            if (loginResponse.access_token !== undefined && loginResponse.access_token !== null) {
              sessionStorage.setItem('currentUser', JSON.stringify(loginResponse));
              response(true);
            }
          } else {
            response(false);
          }
        }
      };

      xhr.open('POST', LOGIN_URL, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send(formData);

    });

  }

  function isUserAuthenticated() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    return userData !== null;
  }

  function getChannels($http) {
    return new Promise(function (responseData) {
      var channels = [];
      if (isUserAuthenticated()) {
        var req = prepareRequest();
        $http(req).then(function (response) {
          channels = response.data.results;
          responseData(channels);
        });
      } else {
        var customerAutentication = loginToMiddleware();
        customerAutentication.then(function (isAuthentication) {
          if (isAuthentication) {
            var req = prepareRequest();
            $http(req).then(function (response) {
              channels = response.data.results;
              responseData(channels);
            });

          }
        });
      }

    });
  }

  function prepareRequest() {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    var req = {
      method: 'GET',
      url: 'http://eu.xservers.cloud:8888/interface/api/v2/users/111/tv-channels',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + userData.access_token
      }
    };
    return req;
  }

  function getChannelUrl($http, channelId) {
    return new Promise(function (responseData) {
      var userData = JSON.parse(sessionStorage.getItem('currentUser'));
      var req = {
        method: 'GET',
        url: 'http://eu.xservers.cloud:8888/interface/api/v2/users/111/tv-channels/' + channelId + '/link',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + userData.access_token
        }
      };
      $http(req).then(function (response) {
        var channelUrl = response.data.results;
        responseData(channelUrl);
      });
    });

  }
}());
