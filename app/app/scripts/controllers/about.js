'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
