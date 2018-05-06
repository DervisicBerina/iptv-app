(function () {
    'use strict';
  
    angular
      .module('users')
      .controller('ChannelListController', ChannelListController);
  
      ChannelListController.$inject = ['$scope','ChannelsService','Authentication'];
  
    function ChannelListController($scope,ChannelsService,Authentication) {
      
      var vm = this;
      vm.channelList = getChannels();
      vm.user = Authentication.user; 
      console.log("lista"); 
      
      function getChannels(){
        return ChannelsService.loadChannels();
      }
    }

    
  }());
  