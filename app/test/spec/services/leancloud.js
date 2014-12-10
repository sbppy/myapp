'use strict';

describe('Service: leancloud', function () {

  // load the service's module
  beforeEach(module('betaApp'));

  // instantiate service
  var leancloud;
  beforeEach(inject(function (_leancloud_) {
    leancloud = _leancloud_;
  }));

  it('should do something', function () {
    expect(!!leancloud).toBe(true);
  });

});
