const { authenticate } = require("@feathersjs/authentication").hooks;
const { END_POINTS } = require("../../api-end-points");
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [addToCart()],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

function addToCart() {
  return function (hook) {
    return new Promise((resolve, reject) => {
      console.log("hook data: addToCart", hook.data);
      console.log("hook params: addToCart", hook.params);
      const cartItemService = hook.app.service(END_POINTS.cartItems);
      const { itemID, cartID } = hook.data;
      const cartItemObj = {
        itemID: itemID,
        cartID: cartID,
      };
      cartItemService
        .create(cartItemObj)
        .then((cartCreated) => {
          console.log("cartCreated", cartCreated);
          hook.result = Object.assign({}, hook.result, {
            cart: cartCreated,
          });
          resolve(hook);
        })
        .catch((cartItemErr) => {
          reject(cartItemErr);
        });
    });
  };
}
