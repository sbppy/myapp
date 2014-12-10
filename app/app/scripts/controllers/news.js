'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:NewsCtrl
 * @description
 * # NewsCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  .controller('NewsCtrl', function ($scope, $routeParams, $location, dataService) {
    $scope.init = function () {
      $scope.limit = ($routeParams.limit) ? parseInt($routeParams.limit) : undefined;
      $scope.skip = ($routeParams.skip) ? parseInt($routeParams.skip) : undefined;

      if ((angular.isUndefined($scope.limit) || $scope.limit <= 0) || (angular.isUndefined($scope.skip) || $scope.skip < 0 )) {
        $location.url('news/0/10');
        return;
      }

      dataService.getLatestNews($scope.limit, $scope.skip)
        .then(function (newss) {
          $scope.newss = newss;
          angular.forEach(newss, function (news) {
            dataService.getRelationField(news, 'relatedProducts')
              .then(function (relatedProducts) {
                news.related = relatedProducts;
                news.loaded = true;
              }, function (err) {
                console.error(err);
              })
          })
        }, function (err) {
          console.error(err);
        })

    }
  });
