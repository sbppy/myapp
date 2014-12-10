'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:RankCtrl
 * @description
 * # RankCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  .controller('RankCtrl', function ($scope, dataService) {
    dataService.getRankProducts()
      .then(function (ranks) {
        $scope.ranks = ranks;
      }, function (err) {
        console.error(err);
      })
  });
