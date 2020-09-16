const express = require('express');
const mongoose = require('mongoose');
const Wishlist = require("./listModel");

const router = express.Router();
const controller = require('./wishlistController');

router.get("/", controller.getList);

router.post("/", controller.createList);

router.post('/add', controller.addProductToList);

router.post('/remove', controller.removeProductFromList);


module.exports = router;