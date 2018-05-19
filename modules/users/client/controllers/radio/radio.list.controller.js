(function () {
  'use strict';

  angular
    .module('users')
    .controller('RadioListController', RadioListController);

  RadioListController.$inject = ['$scope', 'RadioService', 'Authentication'];

  function RadioListController($scope, RadioService, Authentication) {

    var vm = this;
    vm.channelList = getRadio();
    vm.user = Authentication.user;
    vm.currentChannel = vm.channelList[0];
    vm.changeCurrentChannel = changeCurrentChannel;
    vm.playChannel = playChannel;

    vm.tempPlayingContent = 'Liga prvaka Real Madrid';
    vm.nextPlayingContent = 'Alihemija bosanskog drustva';
    vm.tempPlayingTime = '15:00 - 16:00';
    vm.nextPlayingTime = '16:00 - 17:00';

    function getRadio() {
      return RadioService.loadRadio();
    }

    function changeCurrentChannel(radio) {
      vm.currentChannel = radio;
      vm.playChannel(radio.url);
    }

    function playChannel(channelUrl) {
      console.log('playing.. ' + vm.currentChannel.url);

      var video = document.getElementById('video');
      var source = document.createElement('source');

      source.setAttribute('src', channelUrl);

      video.appendChild(source);
      video.play();

    }
  }


}());
