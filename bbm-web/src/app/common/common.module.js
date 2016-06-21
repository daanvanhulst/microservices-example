import CommonConstants from './common.constants';
import trueFalseFilter from './filters/trueFalse.filter';

export default angular.module('bbm.common', [])
    .constant('commonConstants', new CommonConstants())
    .filter('trueFalse', trueFalseFilter);