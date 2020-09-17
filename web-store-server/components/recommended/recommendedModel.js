const mongoose = require('mongoose');
const productModel = require('../product/productModel');
const recommendedModel = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      }],
});

module.exports = mongoose.model('Recommended',recommendedModel);