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

/**
 * Extract itemID and cartID from hook data
 * Create cartItemObj and perform create action
 */
function addToCart() {
  return function (hook) {
    return new Promise((resolve, reject) => {
      const cartItemService = hook.app.service(END_POINTS.cartItems);
      const { itemID, cartID } = hook.data;
      // console.log("cartID: addToCart", cartID);
      const cartItemObj = {
        itemID: itemID,
        cartID: cartID,
        count: 1,
      };
      cartItemService
        .create(cartItemObj)
        .then((cartCreated) => {
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
