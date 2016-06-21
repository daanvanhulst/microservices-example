import DashboardController from './dashboard.controller';

export function dashboardConfig ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('dashboard', {
      url: '/',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: DashboardController,
      controllerAs: 'vm'
    });
}
