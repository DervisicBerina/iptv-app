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
      vm.currentChannel = vm.channelList[0];
      vm.changeCurrentChannel = changeCurrentChannel;
      vm.playChannel = playChannel;

      function changeCurrentChannel(channel) {
        vm.currentChannel = channel;
      }

      function getChannels(){
        return ChannelsService.loadChannels();
      }

      function playChannel() {
        console.log("playing.. " + vm.currentChannel.name);

      }
    }


  }());
