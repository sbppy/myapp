'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  //.constant('chartNames', ['rateValue'])
  .constant('chartNames', [
    {type: 'rateValue', alias: '评分'},
    {type: 'rateCount', alias: '评分次数'},
    {type: 'commentCount', alias: '评论次数'}
  ])
  .controller('ProductCtrl', function ($scope, $rootScope, $routeParams, $location, productCaches, dataService, userService, chartNames) {
    $scope.loaded = false;
    $scope.debug = false;
    $scope.pid = $routeParams.pid;
    $scope.charts = [];

    function updateWatchStatus() {
      var watched = false;
      angular.forEach($rootScope.currentUser.watched, function (watch) {
        if ($scope.pid === watch.id) {
          watched = true;
        }
      })
      $scope.watched = watched;
    }

    function updateProductInfo(){
      $scope.product = productCaches.product.get($scope.pid);
      return dataService.getExtendedProduct($scope.pid)
        .then(function (extendedProduct) {
          $scope.product = extendedProduct.product;
          $scope.detail = extendedProduct.detail;
          return dataService.getNewsByProduct($scope.product);
        }).then(function (newss) {
          $scope.newss = newss;
          angular.forEach($scope.charts, function (chart) {
            generateChart(chart);
          })
          $scope.loaded = true;
        });
    }

    $scope.init = function () {
      function addChart(chartName) {
        var chart = {
          name: chartName.alias,
          type: chartName.type,
          domId: 'chart_' + $scope.pid + '_' + chartName.type,
          show: false
        };
        $scope.charts.push(chart);
      }

      if ($scope.pid) {
        userService.ready
          .then(function () {
            updateWatchStatus($scope.pid);
            updateProductInfo();
          },function(){
            updateProductInfo();
          })
        angular.forEach(chartNames, function (chartName) {
          addChart(chartName);
        })
      } else {
        $location.url('watched');
      }
    }

    $scope.watch = function (watch) {
      userService.watchProduct(watch, $scope.product)
        .then(function (user) {
          updateWatchStatus();
        }, function (err) {
          console.error(err);
        })
    }

    function generateChart(chart) {
      var data = {
        labels: [],
        datasets: [
          {
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
          }
        ]
      };
      dataService.getLatestChartData($scope.product, chart.type)
        .then(function (chartData) {
          console.log('chart,%s,%s,%s', chart.type, chart.name, JSON.stringify(chartData));
          if (chartData) {
            chart.show = false;
            angular.forEach(chartData.data, function (value, name) {
              data.labels.push(name);
              data.datasets[0].data.push(value);
            })
            chart.ctx = chart.ctx || angular.element.find('#' + chart.domId)[0].getContext("2d");
            chart.chartObj = chart.chartObj || new Chart(chart.ctx).Line(data);
            chart.chartObj.update();
            if (_.size(chartData.data) > 1) {
              chart.show = true;
            }
          }
        }, function (err) {
          console.error(err);
        })
    }

    $scope.calculate = function () {
    }
  });
