(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Articles',
      state: 'articles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'TV Channels',
      state: 'channels.list',
      roles: ['*']
    });
    menuService.addSubMenuItem('topbar', 'articles', {
      title: 'Radio',
      state: 'radio.list',
      roles: ['*']
    });
  }
}());
