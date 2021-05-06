const { authenticate } = require("@feathersjs/authentication").hooks;
const { END_POINTS } = require("../../api-end-points");
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [convertCartToOrder(), markCartAsPurchased()],
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

function convertCartToOrder() {
  return function (hook) {
    return new Promise((resolve, reject) => {
      console.log("hook data: convertCartToOrder", hook.data);
      console.log("hook params: convertCartToOrder", hook.params);
      const cartID = hook.params.route.cartID;
      const { userID } = hook.data;
      const orderService = hook.app.service(END_POINTS.order);
      const ordersObj = { cartID: cartID, userID: userID };
      orderService
        .create(ordersObj)
        .then((ordersResponse) => {
          console.log("ordersResponse: convertCartToOrder", ordersResponse);

          hook.result = Object.assign(
            {},
            {
              order: ordersResponse,
            }
          );
          resolve(hook);
        })
        .catch((err) => {
          console.log("err: convertCartToOrder", err);
          reject(err);
        });
    });
  };
}

function markCartAsPurchased() {
  return function (hook) {
    return new Promise((resolve, reject) => {
      const cartService = hook.app.service(END_POINTS.cart);
      const { userID } = hook.data;
      cartService
        .create({ isPurchased: true, userID: userID })
        .then((cartResponse) => {
          console.log("cart response: setCartPurchased", cartResponse);
          hook.result = cartResponse;
          resolve(hook);
        })
        .catch((err) => reject(err));
    });
  };
}
