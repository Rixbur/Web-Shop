const mongoose = require('mongoose');
const Wishlist = require("./listModel");

module.exports.getList = async function (req, res, next) {
    const userId = req.body.user;
    try{
        const result  = await Wishlist.findOne({ user: userId }).exec();
        if(result==null){
        return res.status(204).send();
        }
        return res.status(200).json(result);
    } catch (error){
        next(error);
    }
  };

module.exports.createList = async function (req, res, next) {
    const list = new Wishlist({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        products: []
    });
    console.log(list);
    console.log("-----------------");
    console.log(req.body);
    try {
        const savedObject = await list.save();
        res.status(201).json(savedObject);
    } catch (err) {
    next(err);
    }
  };

module.exports.addProductToList = async function (req, res, next) {
    const newProductId = req.body.productId;
    const userId = req.body.userId;

    try{
        Wishlist.update(
            { user: userId }, 
            { $push: {products: newProductId} }
        ).exec();
        res.status(201).json({ message: 'The wishlist is successfully updated.' });

    } catch (error) {
        next(error);
    }

};

module.exports.removeProductFromList = async function (req, res, next) {
    const userId = req.body.userId;
    const productId = req.body.productId;

    try{
        const result = await Wishlist.updateOne({ user: userId }, {$pullAll: {products: [productId]}}).exec();
        res.status(201).json({ message: 'The wishlist is successfully removed.' });;

    } catch (error) {
        next(error);
    }
};