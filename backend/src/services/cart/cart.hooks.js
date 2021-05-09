const { authenticate } = require("@feathersjs/authentication").hooks;
const { END_POINTS } = require("../../api-end-points");
const mongoose = require("mongoose");
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [modifyCount()],
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
 * Increment/Decrement the count of item in cart
 */
function modifyCount() {
  return function (hook) {
    return new Promise((resolve, reject) => {
      let cartID = hook.data.cartID;
      let patchObj = {};
      if(hook.data.increment) patchObj = { $inc: { count: 1 } };
      else patchObj = { $inc: { count: -1 } };
      const cartItemsService = hook.app.service(END_POINTS.cartItems);
      cartItemsService
        .patch(null, patchObj, {
          query: { cartID: mongoose.Types.ObjectId(cartID) }
        })
        .then((res) => {
          hook.result = res;
          resolve(hook);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
