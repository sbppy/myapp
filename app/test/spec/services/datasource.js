'use strict';

describe('Service: datasource', function () {

  // load the service's module
  beforeEach(module('betaApp'));

  // instantiate service
  var datasource;
  beforeEach(inject(function (_datasource_) {
    datasource = _datasource_;
  }));

  it('should do something', function () {
    expect(!!datasource).toBe(true);
  });

});
