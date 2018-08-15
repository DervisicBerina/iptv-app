(function () {
  'use strict';

  angular
    .module('users')
    .controller('RadioListController', RadioListController);

  RadioListController.$inject = ['$scope', 'RadioService', 'Authentication', 'PlayerService'];

  function RadioListController($scope, RadioService, Authentication, PlayerService) {

    var vm = this;
    setupJWPlayer();
    vm.radioList = [];
    vm.user = Authentication.user;
    vm.currentRadioChannel = vm.radioList[0];
    vm.setupJWPlayer = setupJWPlayer;
    vm.changeCurrentRadioChannel = changeCurrentRadioChannel;

    function changeCurrentRadioChannel(radioChannel) {
      vm.currentRadioChannel = radioChannel;
      playRadioChannel(radioChannel.url);
    }

    function getRadioChannels() {
      RadioService.loadRadio().then(function (data) {
        vm.radioList = data;
        changeCurrentRadioChannel(vm.radioList[0]);
        playRadioChannel(vm.radioList[1].url);
      });
    }

    function playRadioChannel(radioUrl) {
      window.jwplayer('player3').setup({
        file: radioUrl + ';stream.mp3',
        type: 'mp3',
        volume: 50
      });
    }

    function setupJWPlayer(radioUrl) {
      window.jwplayer('player3').setup({
        file: radioUrl + ';stream.mp3',
        type: 'mp3',
        volume: 50,
        autostart: true
      });
    }

    $scope.$on("$destroy", function() {
      PlayerService.stopPlayer();
    });

    getRadioChannels();
  }
}());
