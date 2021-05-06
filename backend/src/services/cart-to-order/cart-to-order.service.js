// Initializes the `cart-to-order` service on path `/cart/:id/complete`
const { CartToOrder } = require('./cart-to-order.class');
const hooks = require('./cart-to-order.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cart/:id/complete', new CartToOrder(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cart/:id/complete');

  service.hooks(hooks);
};
