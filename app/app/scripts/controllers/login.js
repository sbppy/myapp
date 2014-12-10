'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, userService) {

    $scope.login = function () {
      //userService.login($scope.username, $scope.password);
      userService.login("fxp007", "1234")
        .then(function (user) {
          $location.url('watched')
        }, function (err) {
          console.log('err');
        })
    }

  });
