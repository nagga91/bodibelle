const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.create = async (req, res) => {
  try {
    const { clientInfo } = req.body;
    const sessionCart = req.session.cart;
    console.log(sessionCart)
    if (!sessionCart || sessionCart.items.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Panier vide' });
    }

    // Récupération des produits depuis la base pour éviter manipulation côté client
    const recalculatedItems = [];
    let total = 0;

    for (const item of sessionCart.items) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      recalculatedItems.push({
        product: product._id,
        quantity: item.quantity
      });
    }

    const cart = new Cart({
      items: recalculatedItems,
      total: total
    });
    await cart.save();

    const order = new Order({
      cart: cart._id,
      totalPrice: total,
      clientInfo
    });
    await order.save();

    req.session.cart = null; // Clear session

    res.status(201).json({ status: 'success', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Erreur serveur' });
  }
};

exports.getAll = async (req, res) => {
  const orders = await Order.find().populate({
    path: 'cart',
    populate: {
      path: 'items.product',
      model: 'Product'
    }
  });
  res.json(orders);
};

exports.updateStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ status: 'success', message: 'Commande supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Erreur lors de la suppression' });
  }
};
