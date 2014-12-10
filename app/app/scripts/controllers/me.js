'use strict';

/**
 * @ngdoc function
 * @name betaApp.controller:MeCtrl
 * @description
 * # MeCtrl
 * Controller of the betaApp
 */
angular.module('betaApp')
  .controller('MeCtrl', function ($scope, dataService) {

    $scope.init = function () {
      dataService.getStatusList()
        .then(function (statusList) {
          $scope.statusList = statusList;
        }, function (err) {
          console.error(err);
        })
    }

    //$scope.sendTestStatus = function () {
    //  var status = new AV.Status(null, '[]()');
    //  AV.Status.sendPrivateStatus(status, '54461783e4b0e72ff49a40bb').
    //    then(function (status) {
    //      //发送成功呢
    //      console.dir(status);
    //    }, function (err) {
    //      //发布失败
    //      console.dir(err);
    //    });
    //}
  });
