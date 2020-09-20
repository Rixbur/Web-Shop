const express = require('express');

const router = express.Router();

const controller = require('./recommendedController');

router.get('/', controller.getRecommendeds);
router.get('/:userEmail', controller.getRecommendedByEmail);
router.post('/', controller.createRecommended);
router.patch('/:userEmail',controller.patchRecommended);
router.patch('/:userEmail/remove',controller.patchRecommendedRemove)
// router.delete('/:orderId', controller.deleteAnRecommended);

module.exports = router;