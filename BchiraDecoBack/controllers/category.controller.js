const Category = require('../models/Category');

exports.getAll = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.create = async (req, res) => {
  try {
    const photos = req.files?.photos?.map(file => file.filename) || [];

    const category = new Category({
      name: req.body.name,
      photos: photos
    });

    await category.save();
    res.status(201).json(category);

    // Debug
    console.log("req.files", req.files);
    console.log("req.body", req.body);
    console.log("photos", photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de la catégorie" });
  }
};

exports.update = async (req, res) => {
  try {
    const photos = req.files?.photos?.map(file => file.filename) || [];
    const updateData = {
      name: req.body.name,
    };

    if (photos.length > 0) {
      updateData.photos = photos;
    }

    const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);

    // Debug
    console.log("req.files", req.files);
    console.log("req.body", req.body);
    console.log("photos", photos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
};

exports.delete = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Supprimée' });
};
