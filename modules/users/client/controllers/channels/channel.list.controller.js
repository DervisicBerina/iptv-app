(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChannelListController', ChannelListController);

  ChannelListController.$inject = ['$scope', 'ChannelsService', 'ChannelEpgService', 'FavoritesService', 'Authentication', 'PlayerService'];


  function ChannelListController($scope, ChannelsService, ChannelEpgService, FavoritesService, Authentication, PlayerService) {

    var vm = this;
    vm.playerActive = true;
    vm.volumeOf = false;
    vm.channelUrl = '';
    vm.tempPlayingContent = '';
    vm.nextPlayingContent = '';
    vm.tempPlayingTime = '';
    vm.nextPlayingTime = '';
    vm.channelsList = [];
    vm.favoriteChannelList = [];
    vm.user = Authentication.user;
    vm.currentChannel = vm.channelsList[0];
    vm.changeCurrentChannel = changeCurrentChannel;
    vm.checkIfInFavorites = checkIfInFavorites;
    vm.addToFavorites = addToFavorites;
    vm.playChannel = playChannel;
    vm.stopPlayer = stopPlayer;
    vm.turnOnVolume = turnOnVolume;
    vm.turnOfVolume = turnOfVolume;
    vm.setFullScreen = setFullScreen;
    getChannels();
    getUserFavoriteChannels();

    function changeCurrentChannel(channel) {
      vm.currentChannel = channel;
      retrieveChannelEpg(channel.id);
      getChannelUrl(channel.id);
    }

    function getChannels() {
      ChannelsService.loadChannels().then(function (data) {
        vm.channelsList = data;
        changeCurrentChannel(vm.channelsList[0]);
        getChannelUrl(vm.currentChannel.id);
      });
    }

    function getUserFavoriteChannels() {
      FavoritesService.retrieveUserFavoriteChannels().then(function (data) {
        vm.favoriteChannelList = [];
        vm.favoriteChannelList = data;
      });
    }

    function checkIfInFavorites(channelId) {
      return vm.favoriteChannelList.includes(channelId);
    }

    function addToFavorites(channelId) {
      if (vm.favoriteChannelList.includes(channelId)) {
        deleteChannelFromFavorites(channelId);
      } else {
        FavoritesService.addFavoriteChannel(channelId).then(function () {
          vm.favoriteChannelList.push(channelId);
        });
      }
      getUserFavoriteChannels();
    }

    function deleteChannelFromFavorites(channelId) {
      FavoritesService.deleteFavoriteChannel(channelId).then(function () {
        for (var cnt = 0; cnt < vm.favoriteChannelList.length; cnt++) {
          if (channelId === vm.favoriteChannelList[cnt]) {
            vm.favoriteChannelList.splice(cnt, 1);
          }
        }
      });
    }

    function getChannelUrl(channelId) {
      ChannelsService.getChannelUrl(channelId).then(function (channelUrl) {
        vm.channelUrl = channelUrl;
        playChannel(vm.channelUrl);
      });

    }

    function retrieveChannelEpg(channelId) {
      ChannelEpgService.loadChannelEpg(channelId, 2).then(function (channelEpg) {
        updateCurrentEPG(channelEpg[1]);
        updateNextEPG(channelEpg[0]);
      });
    }

    function updateCurrentEPG(epg) {
      if (epg !== null && epg !== undefined) {
        vm.nextPlayingTime = convertToHumanReadableTime(epg.start) + ' - ' + convertToHumanReadableTime(epg.end);
        vm.nextPlayingContent = epg.name;
      }
    }

    function updateNextEPG(epg) {
      if (epg !== null && epg !== undefined) {
        vm.tempPlayingTime = convertToHumanReadableTime(epg.start) + ' - ' + convertToHumanReadableTime(epg.end);
        vm.tempPlayingContent = epg.name;
      }
    }

    function convertToHumanReadableTime(pointOfTime) {
      var date = new Date(pointOfTime * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      return (('0' + hours).slice(-2)) + ':' + (('0' + minutes).slice(-2));
    }

    function stopPlayer() {
      vm.playerActive = false;
      PlayerService.stopPlayer();
    }

    function turnOfVolume() {
      vm.volumeOf = true;
      PlayerService.volumeOf();
    }

    function turnOnVolume() {
      vm.volumeOf = false;
      PlayerService.volumeOn();
    }

    function setFullScreen() {
      PlayerService.setFullScreen();
    }

    function playChannel(channelUrl) {
      PlayerService.playChannel(channelUrl);
    }
  }
}());
