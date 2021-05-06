// Initializes the `add-to-cart` service on path `/cart/add`
const { AddToCart } = require('./add-to-cart.class');
const hooks = require('./add-to-cart.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cart/add', new AddToCart(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cart/add');

  service.hooks(hooks);
};
