(function () {
  'use strict';

  // Users service used for communicating with the users REST endpoint
  angular
    .module('users.services')
    .factory('RadioService', RadioService);

  RadioService.$inject = ['$resource', '$http'];

  function RadioService($resource, $http) {
    var Radio = $resource('/api/radio', {}, {
      update: {
        method: 'PUT'
      },
      radio: getRadio($http),
      deleteProvider: {
        method: 'DELETE',
        url: '/api/users/accounts',
        params: {
          provider: '@provider'
        }
      }
    });

    angular.extend(Radio, {
      loadRadio: function () {
        return getRadio($http);
      }
    });

    return Radio;
  }

  function getRadio($http) {
    return new Promise(function (responseData) {
      var radios = [];
      var userData = JSON.parse(sessionStorage.getItem('currentUser'));
      var req = {
        method: 'GET',
        url: 'http://stb.bhmedia.tv:88/interface/api/v2/users/926/radio-channels/',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + userData.access_token
        }
      };
      $http(req).then(function (response) {
        radios = response.data.results;
        responseData(radios);
      });
    });
  }
}());
