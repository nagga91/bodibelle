const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);
router.post('/clear', cartController.clearCart);
router.get('/', cartController.getCart);
router.patch('/update-quantity', cartController.updateQuantity);


module.exports = router;