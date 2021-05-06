const users = require('./users/users.service.js');
const cart = require('./cart/cart.service.js');
const item = require('./item/item.service.js');
const order = require('./order/order.service.js');
const addToCart = require('./add-to-cart/add-to-cart.service.js');
const cartToOrder = require('./cart-to-order/cart-to-order.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(cart);
  app.configure(item);
  app.configure(order);
  app.configure(addToCart);
  app.configure(cartToOrder);
};
