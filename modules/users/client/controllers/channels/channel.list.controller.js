(function () {
    'use strict';
  
    angular
      .module('users')
      .controller('ChannelListControllers', ChannelListController);
  
      ChannelListController.$inject = ['$scope', 'Authentication'];
  
    function ChannelListController($scope, Authentication) {
      var vm = this;
  
      vm.user = Authentication.user;
    }
  }());
  