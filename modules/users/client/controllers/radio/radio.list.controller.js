(function () {
  'use strict';

  angular
    .module('users')
    .controller('RadioListController', RadioListController);

  RadioListController.$inject = ['$scope', 'RadioService', 'Authentication'];

  function RadioListController($scope, RadioService, Authentication) {

    var vm = this;
    vm.getRadio = getRadio();
    vm.radioList = [];
    vm.user = Authentication.user;
    vm.currentRadio;
    vm.changeCurrentChannel = changeCurrentChannel;
    vm.playChannel = playChannel;
    function getRadio() {
      RadioService.loadRadio().then(function (data) {
        // vm.radioList = data;
        // vm.currentRadio = data[0];
        // vm.radioList.concat(data);
        // console.log(vm.radioList);
      });
    }

    function changeCurrentChannel(radio) {
      vm.currentRadio = radio;
      vm.playChannel(radio.url);
    }

    function playChannel(channelUrl) {
      console.log('playing.. ' + vm.currentRadio.url);

      var video = document.getElementById('video');
      var source = document.createElement('source');

      source.setAttribute('src', channelUrl);

      video.appendChild(source);
      video.play();

    }
  }


}());
