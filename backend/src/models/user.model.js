// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html

const { Schema } = require("mongoose");

// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'user';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    isLoggedIn: { type: Boolean },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    cartID: { type: Schema.Types.ObjectId, ref: 'cart' }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
