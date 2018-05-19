(function () {
    'use strict';

    angular
      .module('users')
      .controller('RadioListController', RadioListController);

      RadioListController.$inject = ['$scope','RadioService','Authentication'];

    function RadioListController($scope,RadioService,Authentication) {

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

      function getRadio(){
        return RadioService.loadRadio();
      }

      function changeCurrentRadioChannel(radio) {
        vm.currentChannel = radio;
        vm.playRadioChannel(radio.url);
      }
      function playRadioChannel(channelUrl) {
        console.log("playing.. " + vm.currentChannel.url);

        var video = document.getElementById('video');
        var source = document.createElement('source');

        source.setAttribute('src', channelUrl);

        video.appendChild(source);
        video.play();

      }
    }


  }());
