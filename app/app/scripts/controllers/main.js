'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, userService, dataService) {
    $scope.checkLogin = function () {
      if (!userService.isLogin()) {
        $location.url('login')
      }
    }

    userService.updateCurrentUser()
      .then(function () {
        console.log('user service ready');
      }, function (err) {
        console.log('user service ready');
      })

    $scope.init = function () {
      userService.updateCurrentUser()
        .then(function (user) {
          $scope.checkLogin();
        }, function (err) {
          $location.url('login');
        });
    }

    $scope.logout = function () {
      userService.logout()
        .then(function () {
          $location.url('login')
        }, function (err) {
          console.log('err,%s', err);
          $location.url('login')
        })
    }
  });
