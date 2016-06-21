/* global moment:false */

import config from './index.config';
import routerConfig from './index.route';
import runBlock from './index.run';

import core from './core.module';
import components from './components/components.module';
import commonModule from './common/common.module';

import dashboard from './dashboard/dashboard.module';

import bookmark from './bookmark/bookmark.module';


angular.module('bbm', [
  core.name,
  components.name,
  commonModule.name,
  dashboard.name,
  bookmark.name
])
.constant('moment', moment)
.config(config)
.config(routerConfig)
.run(runBlock);
