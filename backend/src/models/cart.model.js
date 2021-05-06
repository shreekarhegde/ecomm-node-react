// cart-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const { Schema } = require("mongoose");


module.exports = function (app) {
  const modelName = 'cart';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'user' },
    isPurchased: { type: Boolean }
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
