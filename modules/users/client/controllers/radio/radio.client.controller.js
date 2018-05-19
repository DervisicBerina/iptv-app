(function () {
  'use strict';

  angular
    .module('users')
    .controller('RadioController', RadioController);

  RadioController.$inject = ['$scope', 'Authentication'];

  function RadioController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
  }
}());
