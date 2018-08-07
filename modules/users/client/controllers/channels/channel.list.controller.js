(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChannelListController', ChannelListController);

  ChannelListController.$inject = ['$scope', 'ChannelsService', 'Authentication'];


  function ChannelListController($scope, ChannelsService, Authentication) {

    var vm = this;
    getChannels();
    vm.channelsList = [];
    vm.user = Authentication.user;
    vm.currentChannel = vm.channelsList[0];
    vm.changeCurrentChannel = changeCurrentChannel;
    vm.playChannel = playChannel;
    vm.channelUrl = '';
    vm.tempPlayingContent = 'Liga prvaka Real Madrid';
    vm.nextPlayingContent = 'Alihemija bosanskog drustva';
    vm.tempPlayingTime = '15:00 - 16:00';
    vm.nextPlayingTime = '16:00 - 17:00';

    function changeCurrentChannel(channel) {
      vm.currentChannel = channel;
      getChannelUrl(channel.id);
    }

    function getChannels() {
      ChannelsService.loadChannels().then(function (data) {
        vm.channelsList = data;
        changeCurrentChannel(vm.channelsList[0]);
        getChannelUrl(vm.currentChannel.id);
      });
    }

    function getChannelUrl(channelId) {
      ChannelsService.getChannelUrl(channelId).then(function (channelUrl) {
        vm.channelUrl = channelUrl;
        playChannel(vm.channelUrl);
      });

    }

    function playChannel(channelUrl) {
      window.jwplayer('player').setup({
        file: channelUrl
      });
    }
  }
}());
