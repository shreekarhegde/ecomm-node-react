const assert = require('assert');
const app = require('../../src/app');

describe('\'cart-items\' service', () => {
  it('registered the service', () => {
    const service = app.service('cart-items');

    assert.ok(service, 'Registered the service');
  });
});
