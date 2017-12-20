

import 'bootstrap/dist/css/bootstrap.css';
import './css/main.css';



import angular from 'angular';

var ngModule = angular.module('app',[]);


require('./directives')(ngModule);
require('./controllers')(ngModule);
require('./services')(ngModule);
