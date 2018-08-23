(function () {
  'use strict';

  angular
    .module('users')
    .controller('RadioListController', RadioListController);

  RadioListController.$inject = ['$scope', 'RadioService', 'Authentication', 'PlayerService'];

  function RadioListController($scope, RadioService, Authentication, PlayerService) {

    $scope.radioList = [];
    $scope.user = Authentication.user;
    $scope.currentRadioChannel = $scope.radioList[0];

    $scope.changeCurrentRadioChannel = function (radioChannel) {
      $scope.currentRadioChannel = radioChannel;
      $scope.playRadioChannel(radioChannel.url);
    };

    $scope.getRadioChannels = function () {
      RadioService.loadRadio().then(function (data) {
        $scope.radioList = data;
        $scope.changeCurrentRadioChannel($scope.radioList[0]);
        $scope.playRadioChannel($scope.radioList[1].url);
      });
    };

    $scope.playRadioChannel = function (radioUrl) {
      window.jwplayer('player3').setup({
        file: radioUrl + ';stream.mp3',
        type: 'mp3',
        volume: 50
      });
    };

    $scope.setupJWPlayer = function (radioUrl) {
      window.jwplayer('player3').setup({
        file: radioUrl + ';stream.mp3',
        type: 'mp3',
        volume: 50,
        autostart: true
      });
    };

    $scope.$on("$destroy", function () {
      PlayerService.stopPlayer();
    });

    $scope.getRadioChannels();
    $scope.setupJWPlayer();
  }
}());
