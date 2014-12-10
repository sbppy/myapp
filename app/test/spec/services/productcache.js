'use strict';

describe('Service: productCache', function () {

  // load the service's module
  beforeEach(module('betaApp'));

  // instantiate service
  var productCache;
  beforeEach(inject(function (_productCache_) {
    productCache = _productCache_;
  }));

  it('should do something', function () {
    expect(!!productCache).toBe(true);
  });

});
