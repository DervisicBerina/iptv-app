(function () {
    'use strict';
  
    angular
      .module('users')
      .controller('ChannelListController', ChannelListController);
  
      ChannelListController.$inject = ['$scope','ChannelsService','Authentication'];
  
    function ChannelListController($scope,ChannelsService,Authentication) {
      
      var vm = this;
      vm.user = Authentication.user; 
      console.log("lista"); 
      //getChannels();
    }

    /*function getChannels(){
      var channelList = ChannelsService.loadChannels();

      console.log("list " + channelList);
      
    }*/
  }());
  