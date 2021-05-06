const assert = require('assert');
const app = require('../../src/app');

describe('\'cart-to-order\' service', () => {
  it('registered the service', () => {
    const service = app.service('cart/:id/complete');

    assert.ok(service, 'Registered the service');
  });
});
