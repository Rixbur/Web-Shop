const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: String
    },
    
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref je naziv modela sa kojim se povezuje ovaj model
        ref: 'Product'
    }],
  });
  
  const wishlistModel = mongoose.model("wishlist", wishlistSchema);
  
  module.exports = wishlistModel;