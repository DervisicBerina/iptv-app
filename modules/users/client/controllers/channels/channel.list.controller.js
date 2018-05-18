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
      vm.currentChannel = "nesto";
      vm.changeCurrentChannel = changeCurrentChannel;
      console.log("lista");

      function changeCurrentChannel(channel) {
        vm.currentChannel = channel.name;
        console.log("nestooo");
      }

      function getChannels(){
        return ChannelsService.loadChannels();
      }
    }


  }());
