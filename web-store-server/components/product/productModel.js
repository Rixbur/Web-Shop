const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: String,
  season: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  articleType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  // size:{
  //     type: Number,
  //     required: true
  // },
  // quantity: {
  //     type: Number,
  //     required: true
  // },
  mapSizeQuantities: {
    type: String,
  },
  productImage: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
