'use strict';

describe('Controller: WatchedCtrl', function () {

  // load the controller's module
  beforeEach(module('betaApp'));

  var WatchedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WatchedCtrl = $controller('WatchedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
