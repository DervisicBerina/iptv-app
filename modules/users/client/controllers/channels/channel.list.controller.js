(function () {
  'use strict';

  angular
    .module('users')
    .controller('ChannelListController', ChannelListController);

  ChannelListController.$inject = ['$scope', 'ChannelsService', 'ChannelEpgService', 'FavoritesService', 'Authentication', 'PlayerService'];


  function ChannelListController($scope, ChannelsService, ChannelEpgService, FavoritesService, Authentication, PlayerService) {

    $scope.playerActive = true;
    $scope.volumeOf = false;
    $scope.channelUrl = '';
    $scope.tempPlayingContent = '';
    $scope.nextPlayingContent = '';
    $scope.tempPlayingTime = '';
    $scope.nextPlayingTime = '';
    $scope.channelsList = [];
    $scope.favoriteChannelList = [];
    $scope.user = Authentication.user;
    $scope.currentChannel = $scope.channelsList[0];


    $scope.changeCurrentChannel = function (channel) {
      $scope.currentChannel = channel;
      $scope.retrieveChannelEpg(channel.id);
      $scope.getChannelUrl(channel.id);
    };

    $scope.getChannels = function () {
      ChannelsService.loadChannels().then(function (data) {
        $scope.channelsList = data;
        $scope.changeCurrentChannel($scope.channelsList[0]);
        $scope.getChannelUrl($scope.currentChannel.id);
        $scope.getUserFavoriteChannels();
      });
    };

    $scope.getUserFavoriteChannels = function () {
      FavoritesService.retrieveUserFavoriteChannels().then(function (data) {
        $scope.favoriteChannelList = [];
        $scope.favoriteChannelList = data;
      });
    };

    $scope.checkIfInFavorites = function (channelId) {
      return $scope.favoriteChannelList.includes(channelId);
    };

    $scope.addToFavorites = function (channelId) {
      if ($scope.favoriteChannelList.includes(channelId)) {
        $scope.deleteChannelFromFavorites(channelId);
      } else {
        FavoritesService.addFavoriteChannel(channelId).then(function () {
          $scope.favoriteChannelList.push(channelId);
        });
      }
      $scope.getUserFavoriteChannels();
    };

    $scope.deleteChannelFromFavorites = function (channelId) {
      FavoritesService.deleteFavoriteChannel(channelId).then(function () {
        for (var cnt = 0; cnt < $scope.favoriteChannelList.length; cnt++) {
          if (channelId === $scope.favoriteChannelList[cnt]) {
            $scope.favoriteChannelList.splice(cnt, 1);
          }
        }
      });
    };

    $scope.getChannelUrl = function (channelId) {
      ChannelsService.getChannelUrl(channelId).then(function (channelUrl) {
        $scope.channelUrl = channelUrl;
        $scope.playChannel($scope.channelUrl);
      });

    };

    $scope.retrieveChannelEpg = function (channelId) {
      ChannelEpgService.loadChannelEpg(channelId, 2).then(function (channelEpg) {
        $scope.updateCurrentEPG(channelEpg[1]);
        $scope.updateNextEPG(channelEpg[0]);
      });
    };

    $scope.updateCurrentEPG = function (epg) {
      if (epg !== null && epg !== undefined) {
        $scope.nextPlayingTime = $scope.convertToHumanReadableTime(epg.start) + ' - ' + $scope.convertToHumanReadableTime(epg.end);
        $scope.nextPlayingContent = epg.name;
      }
    };

    $scope.updateNextEPG = function (epg) {
      if (epg !== null && epg !== undefined) {
        $scope.tempPlayingTime = $scope.convertToHumanReadableTime(epg.start) + ' - ' + $scope.convertToHumanReadableTime(epg.end);
        $scope.tempPlayingContent = epg.name;
      }
    };

    $scope.convertToHumanReadableTime = function (pointOfTime) {
      var date = new Date(pointOfTime * 1000);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      return (('0' + hours).slice(-2)) + ':' + (('0' + minutes).slice(-2));
    };

    $scope.stopPlayer = function () {
      $scope.playerActive = false;
      PlayerService.stopPlayer();
    };

    $scope.turnOfVolume = function () {
      $scope.volumeOf = true;
      PlayerService.volumeOf();
    };

    $scope.turnOnVolume = function () {
      $scope.volumeOf = false;
      PlayerService.volumeOn();
    };

    $scope.setFullScreen = function () {
      PlayerService.setFullScreen();
    };

    $scope.playChannel = function (channelUrl) {
      PlayerService.playChannel(channelUrl);
    };

    $scope.getChannels();

    $scope.$on("$destroy", function () {
      PlayerService.stopPlayer();
    });
  }
}());
