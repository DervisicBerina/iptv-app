(function () {
    'use strict';
  
    angular
      .module('users')
      .controller('RadioListController', RadioListController);
  
      RadioListController.$inject = ['$scope','RadioService','Authentication'];
  
    function RadioListController($scope,RadioService,Authentication) {
      
      var vm = this;
      vm.radioList = getRadio();
      vm.user = Authentication.user; 
      console.log("lista"); 
      
      function getRadio(){
        return RadioService.loadRadio();
      }
    }

    
  }());
  