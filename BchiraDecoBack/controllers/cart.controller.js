const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!req.session.cart) {
    req.session.cart = { items: [], total: 0 };
  }

  const existingIndex = req.session.cart.items.findIndex(i => i.product === productId);

  if (existingIndex > -1) {
    req.session.cart.items[existingIndex].quantity += quantity;
  } else {
    req.session.cart.items.push({ product: productId, quantity });
  }

  // ✅ Recalcul correct du total
  let total = 0;
  for (const item of req.session.cart.items) {
    const product = await Product.findById(item.product).lean();
    if (product) {
      total += product.price * item.quantity;
    }
  }
  req.session.cart.total = total;

  res.json({ status: 'success', cart: req.session.cart });
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  if (!req.session.cart) return res.json({ cart: { items: [], total: 0 } });

  req.session.cart.items = req.session.cart.items.filter(item => item.product !== productId);

  // 🔁 Recalculer le total après suppression
  let total = 0;
  for (const item of req.session.cart.items) {
    const product = await Product.findById(item.product).lean();
    if (product) {
      total += product.price * item.quantity;
    }
  }
  req.session.cart.total = total;

  res.json({ status: 'success', cart: req.session.cart });
};

exports.clearCart = (req, res) => {
  req.session.cart = { items: [], total: 0 };
  res.json({ status: 'cleared' });
};

exports.getCart = async (req, res) => {
  if (!req.session.cart || !req.session.cart.items.length) {
    return res.json({ cart: { items: [], total: 0 } });
  }

  try {
    const populatedItems = await Promise.all(
      req.session.cart.items.map(async (item) => {
        const product = await Product.findById(item.product).lean();
        return {
          ...product,
          quantity: item.quantity,
        };
      })
    );

    return res.json({ cart: { items: populatedItems, total: req.session.cart.total } });
  } catch (error) {
    console.error("Erreur getCart:", error);
    return res.status(500).json({ error: "Erreur lors de la récupération du panier" });
  }
};
exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!req.session.cart || !productId || !quantity || quantity < 1) {
    return res.status(400).json({ error: 'Requête invalide' });
  }

  const index = req.session.cart.items.findIndex(item => item.product === productId);
  if (index === -1) {
    return res.status(404).json({ error: 'Produit non trouvé dans le panier' });
  }

  req.session.cart.items[index].quantity = quantity;

  // ✅ Recalcul du total
  let total = 0;
  for (const item of req.session.cart.items) {
    const product = await Product.findById(item.product).lean();
    if (product) {
      total += product.price * item.quantity;
    }
  }

  req.session.cart.total = total;
  console.log(req.session.cart)
  res.json({ status: 'success', cart: req.session.cart });
};
