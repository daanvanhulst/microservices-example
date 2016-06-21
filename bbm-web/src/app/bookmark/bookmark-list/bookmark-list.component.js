import controller from './bookmark-list.controller';

let bookmarkListComponent = {
  restrict: 'E',
  bindings: {},
  templateUrl: 'app/bookmark/bookmark-list/bookmark-list.html',
  controller: controller,
  controllerAs: 'vm'
};

export default bookmarkListComponent;