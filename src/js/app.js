'use strict';


angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngStorage',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'firebase',
    'simpleLogin',
    'changeEmail',
    'leaflet-directive'
])

  .run(['simpleLogin', function(simpleLogin) {
    //console.log('run'); //debug
    simpleLogin.getUser();
  }])

