(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChannelsController', ChannelsController);

  ChannelsController.$inject = ['$scope', 'Authentication'];

  function ChannelsController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
  }
}());
