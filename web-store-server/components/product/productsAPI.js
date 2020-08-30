const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './images/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
  // reject a file
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Product = require("../product/productModel");

getProducts = async function (req, res, next) {
  try {
    const products = await Product.find({}).sort({ name: 1, price: -1 }).exec();
    // for(product of products){
    //   product.mapa =  new Map(JSON.parse(product.mapQuantOfSizes));
    // }
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
router.get('/', getProducts);

router.post("/", upload.array('productImage'), (req, res, next) => {
  
  console.log(req.body.mapQuantOfSizes);
  const fileNames =[]
  for(oneFile of req.files){
    fileNames.push(oneFile.originalname);
  }
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    season: req.body.season,
    price: req.body.price,
    articleType: req.body.articleType,
    category: req.body.category,
    mapQuantOfSizes: req.body.mapQuantOfSizes,
    productImage: fileNames
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            productImage: result.productImage,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


getByProductId = async function (req, res, next) {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId).exec();

    if (!product) {
      return res
        .status(404)
        .json({ message: 'The product with given id does not exist' });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
router.get("/:productId", getByProductId);

updateByProductId = async function (req, res, next) {
  const productId = req.params.productId;
  const updateOptions = {};
  
  try {
    const product = await Product.findById(productId).exec();
    const mapQuantOfSizes = new Map(JSON.parse(product['mapQuantOfSizes']));
    const currentCount = mapQuantOfSizes.get(req.body.size);
    if(currentCount == 1){
      mapQuantOfSizes.delete(36);
    }
    else{
      mapQuantOfSizes.set(36, currentCount - 1);
    }
    const mapa = JSON.stringify(Array.from(mapQuantOfSizes.entries()));
    updateOptions['mapQuantOfSizes'] = mapa;

    await Product.updateOne({ _id: productId }, { $set: updateOptions }).exec();
    res.status(200).json({ message: 'The product is successfully updated' });
  } catch (err) {
    next(err);
  }
};

router.patch("/:productId", updateByProductId);


deleteByProductId = async function (req, res, next) {
  const productId = req.params.productId;

  try {
    
    const deletedProducts = await Product.deleteOne({ _id: productId }).exec();
    if(deletedProducts['deletedCount']){
      res.status(200).json({ message: 'The product is successfully deleted' });
    }
    else{
      res.status(200).json({ message: 'The product is already bought' });
    }
  } catch (err) {
    next(err);
  }
};
router.delete("/:productId", deleteByProductId);

module.exports = router;
