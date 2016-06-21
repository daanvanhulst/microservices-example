import controller from './menu.controller';

let menuComponent = {
  restrict: 'E',
  bindings: {},
  templateUrl: 'app/components/menu/menu.html',
  controller: controller,
  controllerAs: 'vm'
};

export default menuComponent;