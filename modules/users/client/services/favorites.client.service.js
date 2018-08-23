(function () {
  'use strict';
  angular
    .module('users.services')
    .factory('FavoritesService', FavoritesService);

  FavoritesService.$inject = ['$resource', '$http'];

  function FavoritesService($resource, $http) {
    var FavoriteChannels = $resource('/api/favorites', {}, { });

    angular.extend(FavoriteChannels, {
      retrieveUserFavoriteChannels: function () {
        return retrieveUserFavoriteChannels($http);
      },
      addFavoriteChannel: function (channelId) {
        return addChannelToUserFavorites(channelId);
      },
      deleteFavoriteChannel: function (channelId) {
        return deleteUserFavoriteChannel(channelId);
      }
    });
    return FavoriteChannels;
  }

  function retrieveUserFavoriteChannels($http) {
    var userData = JSON.parse(sessionStorage.getItem('currentUser'));
    if (userData === null || userData === undefined) {
      return;
    }

    var userId = userData.user_id;

    var FAVORITES_API_URL = 'http://stb.bhmedia.tv:88/interface/api/v2/users/' + userId + '/tv-favorites';

    return new Promise(function (responseData) {
      var userData = JSON.parse(sessionStorage.getItem('currentUser'));
      var req = {
        method: 'GET',
        url: FAVORITES_API_URL,
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + userData.access_token
        }
      };
      $http(req).then(function (response) {
        var favorites = response.data.results;
        responseData(favorites);
      });
    });
  }

  function addChannelToUserFavorites(channelId) {
    return new Promise(function (responseData) {
      var userData = JSON.parse(sessionStorage.getItem('currentUser'));
      var xhr = new XMLHttpRequest();
      var formData = 'ch_id=' + channelId;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            responseData(response);
          } else {
            return false;
          }
        }
      };

      var url = 'http://stb.bhmedia.tv:88/interface/api/v2/users/' + userData.user_id + '/tv-favorites';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer  ' + userData.access_token);
      xhr.send(formData);
    });
  }

  function deleteUserFavoriteChannel(channelId) {
    return new Promise(function (responseData) {
      var userData = JSON.parse(sessionStorage.getItem('currentUser'));
      var xhr = new XMLHttpRequest();
      var formData = 'ch_id=' + channelId;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            responseData(response);
          } else {
            return false;
          }
        }
      };

      var url = 'http://stb.bhmedia.tv:88/interface/api/v2/users/' + userData.user_id + '/tv-favorites/' + channelId;
      xhr.open('DELETE', url, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer  ' + userData.access_token);
      xhr.send(formData);
    });
  }
}());
