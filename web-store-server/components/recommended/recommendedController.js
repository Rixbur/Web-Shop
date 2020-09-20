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
        const savedObject = await Recommended.findOne({email:email}).populate('products').exec();
        res.status(201).json(savedObject);

    }catch(err){
        next(err);
    }
}
module.exports.patchRecommended = async function(req,res,next){
    const email = req.params.userEmail;
    const newProduct = req.body.p_id;
    
    try{
        const recommended = await Recommended.findOne({email:email}).exec();
        console.log(recommended);
        if(recommended!==null){
            
            const productPatch = {};
            productPatch.products = recommended.products.slice(Math.max(recommended.products.length-5, 0));
            const index = productPatch.products.indexOf(newProduct);
            if (index > -1) {//ako vec postoji
                res.status(200).json({message:'already exits'});
            }
            else{
                productPatch.products.push(newProduct);
                const savedObject = await Recommended.findOneAndUpdate({email:email},{$set: productPatch })
                console.log(savedObject);
                res.status(201).json(savedObject);
            }
            
        }else{
            console.log('Poz');
            let object = new Recommended ({
                _id: new mongoose.Types.ObjectId(),
                email:email,
                products:[]
            })
            object.products.push(newProduct);
            

            const savedObject = await object.save();
            res.status(201).json(savedObject);
        }

    }catch(err){
        next(err);
    }
}
module.exports.patchRecommendedRemove = async function(req,res,next){
    const email = req.params.userEmail;
    const newProduct = req.body.p_id;
    console.log(email);
    console.log(newProduct);
    
    try{
        const recommended = await Recommended.findOne({email:email}).exec();
        const productPatch = {};
        productPatch.products = recommended.products.slice(Math.max(recommended.products.length-5, 0));
        const index = productPatch.products.indexOf(newProduct);
        if (index > -1) {
            productPatch.products.splice(index, 1);
        }
        const savedObject = await Recommended.findOneAndUpdate({email:email},{$set: productPatch })
        res.status(201).json(savedObject);
    }catch(err){
        next(err);
    }
}