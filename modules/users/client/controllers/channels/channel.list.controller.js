(function () {
    'use strict';

    angular
      .module('users')
      .controller('ChannelListController', ChannelListController);

      ChannelListController.$inject = ['$scope','ChannelsService','Authentication'];

    function ChannelListController($scope,ChannelsService,Authentication) {

      var vm = this;
      vm.channelList = getRadio();
      vm.user = Authentication.user;
      vm.currentChannel = vm.channelList[0];
      vm.changeCurrentRadioChannel = changeCurrentRadioChannel;
      vm.playRadioChannel = playRadioChannel;

      vm.tempPlayingContent = "Liga prvaka Real Madrid";
      vm.nextPlayingContent = "Alihemija bosanskog drustva";
      vm.tempPlayingTime = "15:00 - 16:00";
      vm.nextPlayingTime = "16:00 - 17:00";

      function changeCurrentChannel(channel) {
        vm.currentChannel = channel;
        vm.playRadioChannel(channel.url);
      }

      function getRadio(){
        return ChannelsService.loadChannels();
      }

      function playChannel(channelUrl) {
        console.log("playing.. " + vm.currentChannel.url);

        var video = document.getElementById('video');
        var source = document.createElement('source');

        source.setAttribute('src', channelUrl);

        video.appendChild(source);
        video.play();

      }
    }


  }());
