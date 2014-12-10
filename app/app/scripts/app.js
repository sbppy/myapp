'use strict';

/*global AV:false */

/**
 * @ngdoc overview
 * @name betaApp
 * @description
 * # betaApp
 *
 * Main module of the application.
 */
angular
  .module('betaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('paths', {
    '/': {
      redirectTo: '/login'
    }, '/login': {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }, '/about': {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    }, '/watched': {
      templateUrl: 'views/watched.html',
      controller: 'WatchedCtrl'
    }, '/rank': {
      templateUrl: 'views/rank.html',
      controller: 'RankCtrl'
    }, '/search/:name?': {
      templateUrl: 'views/search.html',
      controller: 'SearchCtrl'
    }, '/product/:pid': {
      templateUrl: 'views/product.html',
      controller: 'ProductCtrl'
    }, '/news/:skip?/:limit?': {
      templateUrl: 'views/news.html',
      controller: 'NewsCtrl'
    }, '/me': {
      templateUrl: 'views/me.html',
      controller: 'MeCtrl'
    }
  })
  .config(function ($routeProvider, paths) {
    angular.forEach(paths, function (path, name) {
      $routeProvider.when(name, path);
    });

    $routeProvider
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(function ($rootScope, leancloud) {
    AV.initialize('xv1cgfapsn90hyy2a42i9q6jg7phbfmdpt1404li6n93tt2r', '70sp4h8prccxzyfp56vwm9ksczji36bsrjvtwzvrzegfza67');
    leancloud.angularizeAll();
  })
  .factory('$exceptionHandler', ['$window', function ($window) {
    return function (exception) {
      if (exception.stack) {
        exception.stack = exception.stack.replace('new ', '');
      }
      if ($window.atatus) {
        //$window.atatus.send(exception);
      }
      throw exception;
    };
  }]);
