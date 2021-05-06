// order-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html

const { Schema } = require("mongoose");

// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'order';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    cartID: { type: Schema.Types.ObjectId, ref: 'cart' },
    userID: { type: Schema.Types.ObjectId, ref: 'user' },
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
