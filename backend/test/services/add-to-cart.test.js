const assert = require('assert');
const app = require('../../src/app');

describe('\'add-to-cart\' service', () => {
  it('registered the service', () => {
    const service = app.service('cart/add');

    assert.ok(service, 'Registered the service');
  });
});
