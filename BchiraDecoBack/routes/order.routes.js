const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/', orderController.create);
router.get('/', orderController.getAll);
router.patch('/:id/status', orderController.updateStatus);
router.delete('/:id', orderController.deleteOrder);


module.exports = router;