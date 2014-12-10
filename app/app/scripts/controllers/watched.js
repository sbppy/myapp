'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:WatchedCtrl
 * @description
 * # WatchedCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  .controller('WatchedCtrl', function ($scope, $rootScope, $location, userService, dataService) {
    $scope.init = function () {
      userService.ready
        .then(function () {
          if (!userService.isLogin()) {
            $location.url('login');
            return;
          }
          //$scope.refreshWatched();
          $scope.watchedProducts = $rootScope.currentUser.watched;
        }, function (err) {
          console.error(err);
        })
    }
  });
