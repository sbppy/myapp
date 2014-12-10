'use strict';

/**
 * @ngdoc service
 * @name betaApp.dataService
 * @description
 * # dataService
 * Service in the betaApp.
 */
angular.module('betaApp')
  .service('dataService', function dataService($rootScope, $q, productCaches, leancloud) {

    function userInfo(userId) {
      return $q(function (resolve, reject) {
        new AV.Query("_User").get(userId)
          .then(function (user) {
            resolve(user);
          }, function (err) {
            reject(err);
          })
      })
    }

    function getWatchedProducts(user) {
      return $q(function (resolve, reject) {
        user.relation('followedProducts').query().find()
          .then(function (followedProducts) {
            angular.forEach(followedProducts, function (p) {
              productCaches.product.put(p.id, p);
            })
            resolve(followedProducts);
          }, function (err) {
            reject(err);
          })
      })
    }

    function getProduct(productId) {
      return $q(function (resolve, reject) {
        leancloud.objectQuery('Product').get(productId)
          .then(function (product) {
            resolve(product);
          }, function (err) {
            reject(err);
          })
      }, 0)
    }

    function getExtendedProduct(productId) {
      return $q(function (resolve, reject) {
        var result = {};
        leancloud.objectQuery('Product').get(productId)
          .then(function (product) {
            result.product = product;
            var query = leancloud.objectQuery('ProductDetail');
            query.equalTo('product', product);
            return query.first();
          }).then(function (detail) {
            result.detail = detail;
            productCaches.productExt.put(result.product.id, result);
            resolve(result);
          }, function (err) {
            reject(err);
          })
      }, 0)
    }

    function getNewsByProduct(product) {
      return $q(function (resolve, reject) {
        leancloud.reverseQuery('News', 'relatedProducts', product).find()
          .then(function (newss) {
            resolve(newss);
          }, function (err) {
            reject(err);
          })
      })
    }

    function searchProduct(options) {
      return $q(function (resolve, reject) {
        var query = leancloud.objectQuery('Product');
        angular.forEach(options, function (option, name) {
          query.contains(name, option);
        })
        query.find()
          .then(function (products) {
            angular.forEach(products, function (p) {
              productCaches.product.put(p.id, p);
            })
            resolve(products);
          }, function (err) {
            reject(err);
          })
      }, 0)
    }

    function getLatestNews(limit, skip) {
      return $q(function (resolve, reject) {
        var query = leancloud.objectQuery('News');
        query.limit(limit);
        query.skip(skip);
        query.find()
          .then(function (newss) {
            resolve(newss);
          }, function (err) {
            reject(err);
          })
      })
    }

    function getRelationField(obj, fieldName) {
      return $q(function (resolve, reject) {
        leancloud.relationQuery(obj, fieldName).find()
          .then(function (products) {
            resolve(products);
          }, function (err) {
            reject(err);
          })
      })
    }

    function getExtendedUser(user) {
      return $q(function (resolve, reject) {
        getWatchedProducts(user)
          .then(function (watched) {
            user.watched = watched;
            resolve(user);
          }, function (err) {
            reject(err);
          })

      })
    }

    function saveAndUpdateUser(user) {
      return $q(function (resolve, reject) {
        leancloud.saveObject(user)
          .then(function (user) {
            return getExtendedUser(user);
          }).then(function (extendedUser) {
            resolve(user);
          }, function (err) {
            reject(err);
          })
      })
    }

    function getLatestChartData(product, type) {
      return $q(function (resolve, reject) {
        var query = leancloud.objectQuery('ChartWeekly');
        query.equalTo('product', product);
        query.equalTo('type', type);
        query.first()
          .then(function (chart) {
            resolve(chart);
          }, function (err) {
            reject(err);
          })
      })
    }

    function getRankProducts() {
      return $q(function (resolve, reject) {
        var query = leancloud.objectQuery('DailyRank');
        query.limit(10);
        query.descending('normalisedRank');
        query.include('product');
        query.find()
          .then(function (products) {
            resolve(products);
          }, function (err) {
            reject(err);
          })
      })
    }

    function getStatusList() {
      return $q(function (resolve, reject) {
        leancloud.getStatuses()
          .then(function (statuss) {
            resolve(statuss);
          }, function (err) {
            reject(err);
          })
      })
    }

    return {
      getProduct: getProduct,
      getWatchedProducts: getWatchedProducts,
      getExtendedProduct: getExtendedProduct,
      userInfo: userInfo,
      searchProduct: searchProduct,
      getNewsByProduct: getNewsByProduct,
      getLatestNews: getLatestNews,
      getRelationField: getRelationField,
      getExtendedUser: getExtendedUser,
      saveAndUpdateUser: saveAndUpdateUser,
      getLatestChartData: getLatestChartData,
      getRankProducts: getRankProducts,
      getStatusList: getStatusList
    }
  });
