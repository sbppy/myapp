'use strict';

/**
 * @ngdoc service
 * @name betaApp.productCache
 * @description
 * # productCache
 * Factory in the betaApp.
 */
angular.module('betaApp')
  .factory('productCaches', function ($cacheFactory) {
    return {
      product: $cacheFactory('product'),
      productExt: $cacheFactory('product-ext')
    };
  });
