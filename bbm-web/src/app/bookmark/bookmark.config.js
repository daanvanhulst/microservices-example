import listController from './bookmark-list/bookmark-list.controller';
import detailController from './bookmark-detail/bookmark-detail.controller';
import addController from './bookmark-add/bookmark-add.controller';
import editController from './bookmark-edit/bookmark-edit.controller';

export default function bookmarkConfig ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('bookmark', {
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('bookmark.list', {
      url: '/bookmark',
      templateUrl: 'app/bookmark/bookmark-list/bookmark-list.html',
      controller: listController,
      controllerAs: 'vm'
    })
    .state('bookmark.detail', {
      url: '/bookmark/detail/:id',
      templateUrl: 'app/bookmark/bookmark-detail/bookmark-detail.html',
      controller: detailController,
      controllerAs: 'vm'
    })
    .state('bookmark.add', {
      url: '/bookmark/add',
      templateUrl: 'app/bookmark/bookmark-add/bookmark-add.html',
      controller: addController,
      controllerAs: 'vm'
    })
    .state('bookmark.edit', {
      url: '/bookmark/edit/:id',
      templateUrl: 'app/bookmark/bookmark-edit/bookmark-edit.html',
      controller: editController,
      controllerAs: 'vm'
    });
}