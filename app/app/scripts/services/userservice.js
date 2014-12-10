'use strict';

/**
 * @ngdoc service
 * @name betaApp.userService
 * @description
 * # userService
 * Service in the betaApp.
 */
angular.module('betaApp')
  .service('userService', function datasource($q, $rootScope, dataService) {
    var ready = $q.defer();

    function isLogin() {
      return !(_.isNull($rootScope.currentUser) || _.isUndefined($rootScope.currentUser));
    }

    function login(username, password) {
      var result = $q.defer();
      AV.User.logIn(username, password)
        .then(function (user) {
          return updateCurrentUser()
        }).then(function (user) {
          result.resolve(user);
        }, function (err) {
          result.reject(err);
        })
      return result.promise;
    }

    function logout() {
      var result = $q.defer();
      AV.User.logOut();
      $rootScope.currentUser = undefined;
      result.resolve();
      return result.promise;
    }

    function updateCurrentUser() {
      return $q(function (resolve, reject) {
        if (AV.User.current()) {
          dataService.userInfo(AV.User.current().id)
            .then(function (user) {
              return dataService.getExtendedUser(user);
            })
            .then(function (extendedUser) {
              $rootScope.currentUser = extendedUser;
              ready.resolve();
              resolve(extendedUser);
            }, function (err) {
              ready.reject();
              reject(err);
            })
        } else {
          $rootScope.currentUser = undefined;
          ready.reject();
          reject('not log in');
        }
      })
    }

    function watchProduct(watch, product) {
      return $q(function (resolve, reject) {
        var watchedRelation = $rootScope.currentUser
          .relation('followedProducts');
        if (watch) {
          watchedRelation.add(product);
        } else {
          watchedRelation.remove(product);
        }
        dataService.saveAndUpdateUser($rootScope.currentUser)
          .then(function (user) {
            resolve(user);
          }, function (err) {
            reject(err);
          })
      })
    }

    return {
      isLogin: isLogin,
      login: login,
      logout: logout,
      updateCurrentUser: updateCurrentUser,
      watchProduct: watchProduct,
      ready: ready.promise
    }
  });
