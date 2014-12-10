'use strict';

describe('Controller: RankCtrl', function () {

  // load the controller's module
  beforeEach(module('betaApp'));

  var RankCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RankCtrl = $controller('RankCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
