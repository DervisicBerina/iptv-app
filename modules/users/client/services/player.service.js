(function () {
  'use strict';
  angular
    .module('users.services')
    .factory('PlayerService', PlayerService);

  PlayerService.$inject = ['$resource'];

  function PlayerService($resource) {
    var Player = $resource('/api/player', {}, {});

    angular.extend(Player, {
      playChannel: function (channelUrl) {
        return playChannel(channelUrl);
      },
      stopPlayer: function () {
        return stopPlayer();
      },
      volumeOf: function () {
        return turnOfVolume();
      },
      volumeOn: function () {
        return turnOnVolume();
      },
      setFullScreen: function () {
        return setFullScreen();
      }
    });
    return Player;
  }

  function playChannel(channelUrl) {
    if (window.jwplayer('player') !== undefined) {
      window.jwplayer('player').setup({
        file: channelUrl
      });
    }
  }

  function stopPlayer() {
    window.jwplayer('player').stop();
  }

  function turnOfVolume() {
    window.jwplayer('player').setMute(true);
  }

  function turnOnVolume() {
    window.jwplayer('player').setMute(false);
    window.jwplayer('player').setVolume(100);
  }

  function setFullScreen() {
    window.jwplayer('player').setFullscreen(true);
  }
}());
