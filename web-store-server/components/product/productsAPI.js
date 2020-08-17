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
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
router.get('/', getProducts);

router.post("/", upload.single('productImage'), (req, res, next) => {
  
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    season: req.body.season,
    price: req.body.price,
    articleType: req.body.articleType,
    category: req.body.category,
    size: req.body.size,
    productImage: req.file.filename
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
  for (let i = 0; i < req.body.length; ++i) {
    let option = req.body[i];
    updateOptions[option.nazivPolja] = option.novaVrednost;
  }

  try {
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
    // Prvo brisemo element ciji je identifikator prosledjeni ID proizvoda
    await Product.deleteOne({ _id: productId }).exec();
    // Zatim brisemo sve porudzbine
    // u cijem se nizu "products" nalazi prosledjeni ID proizvoda.
    // Vise o pisanju upita sa nizovima: https://docs.mongodb.com/manual/tutorial/query-arrays/
    await Order.deleteMany({ _id: productId }).exec();

    res.status(200).json({ message: 'The product is successfully deleted' });
  } catch (err) {
    next(err);
  }
};
router.delete("/:productId", deleteByProductId);

module.exports = router;
