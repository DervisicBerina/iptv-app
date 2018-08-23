(function () {
  'use strict';

  angular
    .module('users')
    .controller('RadioListController', RadioListController);

  RadioListController.$inject = ['$scope', 'RadioService', 'Authentication', 'PlayerService'];

  function RadioListController($scope, RadioService, Authentication, PlayerService) {

    $scope.radioList = [];
    $scope.volumeOf = false;
    $scope.user = Authentication.user;
    $scope.currentRadioChannel = $scope.radioList[0];

    $scope.changeCurrentRadioChannel = function (radioChannel) {
      $scope.currentRadioChannel = radioChannel;
      $scope.playRadioChannel(radioChannel.url);
    };

    $scope.getRadioChannels = function () {
      console.log('Load radios');
      RadioService.loadRadio().then(function (data) {
        console.log('Radios LOADED');
        $scope.radioList = data;
        $scope.currentRadioChannel = $scope.radioList[0];
        $scope.playRadioChannel($scope.radioList[1].url);
        $scope.$digest();
      });
    };

    $scope.playRadioChannel = function (radioUrl) {
      window.jwplayer('player3').setup({
        file: radioUrl + ';stream.mp3',
        type: 'mp3',
        volume: 50
      });
    };

    $scope.turnOfVolume = function () {
      $scope.volumeOf = true;
      window.jwplayer('player3').setMute(true);
    };

    $scope.turnOnVolume = function () {
      $scope.volumeOf = false;
      window.jwplayer('player3').setMute(false);
      window.jwplayer('player3').setVolume(100);
    };

    $scope.setFullScreen = function () {
      PlayerService.setFullScreen();
    };

    $scope.$on("$destroy", function () {
      window.jwplayer('player3').stop();
    });

    $scope.getRadioChannels();
  }
}());
