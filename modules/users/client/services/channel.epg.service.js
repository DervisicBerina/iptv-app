(function () {
  'use strict';
  angular
    .module('users.services')
    .factory('ChannelEpgService', ChannelEpgService);

  ChannelEpgService.$inject = ['$resource', '$http'];

  function ChannelEpgService($resource, $http) {
    var ChannelEpg = $resource('/api/channelEpg', {}, {
      channelEpg: retrieveChannelEpg($http)
    });

    angular.extend(ChannelEpg, {
      loadChannelEpg: function (channelId, numberOfContent) {
        return retrieveChannelEpg($http, channelId, numberOfContent);
      }
    });
    return ChannelEpg;
  }

  function retrieveChannelEpg($http, channelId, numberOfContent) {
    var EPG_API_URL = 'http://stb.bhmedia.tv:88/interface/api/v2/tv-channels/' + channelId + '/epg?next=' + numberOfContent;

    return new Promise(function (responseData) {
      var userData = JSON.parse(sessionStorage.getItem('currentUser'));
      var req = {
        method: 'GET',
        url: EPG_API_URL,
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
