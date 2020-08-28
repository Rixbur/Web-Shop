const express = require('express');

const router = express.Router();

const controller = require('./ordersController');

router.get('/', controller.getOrders);
router.post('/', controller.createAnOrder);

router.get('/:orderId', controller.getAnOrderById);
router.delete('/:orderId', controller.deleteAnOrderById);

module.exports = router;
