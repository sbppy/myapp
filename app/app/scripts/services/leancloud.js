'use strict';

/*global AV:false */

/**
 * @ngdoc service
 * @name betaApp.leancloud
 * @description
 * # leancloud
 * Service in the betaApp.
 */
angular.module('betaApp')
  .service('leancloud', function leancloud() {
    var classRefCache = {};

    var ClassDefines = {
      'News': {attributes: ['title', 'link', 'source']},
      'Product': {attributes: ['name', 'website']},
      'ProductDetail': {
        attributes: ['size', 'price', 'description', 'developer', 'source', 'category']
      },
      'ChartWeekly': {attributes: ['data']},
      'DailyRank': {attributes: ['normalisedRank', 'source', 'rankValue', 'product']},
      '_User': {attributes: ['username']},
      '_Status': {attributes: ['data']}
    };

    function angularizeAll() {
      angular.forEach(ClassDefines, function (classDefine, className) {
        var classObject = AV.Object.extend(className);
        angular.forEach(classDefine.attributes, function (attr) {
          Object.defineProperty(classObject.prototype, attr, {
            get: function () {
              return this.get(attr);
            },
            set: function (value) {
              this.set(attr, value);
            }
          });
        });
      });
    }

    function getObjectRef(className) {
      return classRefCache[className] || AV.Object.extend(className);
    }

    function objectQuery(className) {
      return new AV.Query(getObjectRef(className));
    }

    function newInstance(className, options) {
      var Ref = getObjectRef(className);
      return new Ref(options);
    }

    function reverseQuery(parentClass, relationKey, child) {
      return AV.Relation.reverseQuery(parentClass, relationKey, child);
    }

    function relationQuery(obj, fieldName) {
      return obj.relation(fieldName).query();
    }

    function saveObject(obj) {
      return obj.save();
    }

    function getStatuss() {
      return AV.Status.inboxQuery(AV.User.current(), 'private').find();
    }

    return {
      angularizeAll: angularizeAll,
      objectRef: getObjectRef,
      objectQuery: objectQuery,
      newInstance: newInstance,
      reverseQuery: reverseQuery,
      relationQuery: relationQuery,
      saveObject: saveObject,
      getStatuses: getStatuss
    };
  });
