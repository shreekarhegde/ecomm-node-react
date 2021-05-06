// Initializes the `cart-items` service on path `/cart-items`
const { CartItems } = require("./cart-items.class");
const createModel = require("../../models/cart-items.model");
const hooks = require("./cart-items.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/cart-items", new CartItems(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("cart-items");

  service.hooks(hooks);
};
