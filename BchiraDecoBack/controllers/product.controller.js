const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  const products = await Product.find().populate('category');
  res.json(products);
};

exports.getByCategory = async (req, res) => {
  const products = await Product.find({ category: req.params.categoryId }).populate('category');
  res.json(products);
};

exports.getOne = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  res.json(product);
};

exports.create = async (req, res) => {
  try {
    const photos = req.files?.photos?.map(file => file.filename) || [];

    const colors = typeof req.body.colors === "string"
      ? req.body.colors.split(',').map(c => c.trim())
      : [];

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      dimensions: req.body.dimensions,
      colors: colors,
      category: req.body.category,
      photos: photos
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({ message: "Erreur lors de la création du produit" });
  }
};

exports.update = async (req, res) => {
  try {
    const photos = req.files?.photos?.map(file => file.filename) || [];

    const colors = typeof req.body.colors === "string"
      ? req.body.colors.split(',').map(c => c.trim())
      : [];

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      dimensions: req.body.dimensions,
      colors: colors,
      category: req.body.category,
    };

    if (photos.length > 0) {
      updateData.photos = photos;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit" });
  }
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Produit supprimé' });
};
