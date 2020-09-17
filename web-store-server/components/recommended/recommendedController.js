const mongoose = require('mongoose');

const Recommended = require('./recommendedModel');

module.exports.createRecommended  = async function(req,res,next){
    const recommended = new Recommended({
        _id:mongoose.Types.ObjectId(),
        email:req.body.email,
        products:req.body.products.map( p => p._id)
    })
    
    try{
        const savedObject = await recommended.save();
        res.status(201).json(savedObject);

    }catch(err){
        next(err);
    }
}
module.exports.getRecommendeds  = async function(req,res,next){
    
    try{
        const savedObject = await Recommended.find({}).exec();
        res.status(201).json(savedObject);

    }catch(err){
        next(err);
    }
}

module.exports.getRecommendedByEmail  = async function(req,res,next){
    const email = req.params.userEmail;
    
    try{
        const savedObject = await Recommended.find({email:email}).populate('products').exec();
        res.status(201).json(savedObject);

    }catch(err){
        next(err);
    }
}
module.exports.patchRecommended = async function(req,res,next){
    const email = req.params.userEmail;
    const newProduct = req.body.product;
    
    try{
        const productPatch = {};
        const recommended = await Recommended.findOne({email:email}).exec();
        
        productPatch.products = recommended.products.slice(Math.max(recommended.products.length-5, 0));
        productPatch.products.push(newProduct._id);
        const savedObject = await Recommended.findOneAndUpdate({email:email},{$set: productPatch })
        res.status(201).json(savedObject);

    }catch(err){
        next(err);
    }
}