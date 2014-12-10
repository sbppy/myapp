'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  .controller('SearchCtrl', function ($scope, $routeParams, dataService) {
    $scope.search = function () {
      dataService.searchProduct($scope.query)
        .then(function (products) {
          console.log('result,%s', JSON.stringify(products));
          $scope.results = products;
        })
    }

    $scope.init = function () {
      $scope.query = {};
      if ($routeParams.name) {
        $scope.query.name = $routeParams.name;
        $scope.search();
      }
    }

  });
