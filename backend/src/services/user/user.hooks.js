const { authenticate } = require('@feathersjs/authentication').hooks;
const { END_POINTS } = require('../../api-end-points');
const mongoose = require('mongoose');
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [createCart()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

/**
 * Once the user is created, create a cart for the user
 */
function createCart(){
  return function(hook){
    return new Promise((resolve, reject) => {
      const cartService = hook.app.service(END_POINTS.cart);
      const userID = hook.result._id
      const cartObj = { userID: mongoose.Types.ObjectId(userID) , isPurchased: false };
      cartService.create(cartObj).then(cartResponse => {
        hook.result.cartResponse = cartResponse;
        return resolve(hook);
      }).catch(error => {
        return reject(error);
      })
    })
  }
}