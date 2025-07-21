const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const upload = require('../middlewares/upload')

router.get('/', controller.getAll);
router.get('/category/:categoryId', controller.getByCategory);
router.get('/:id', controller.getOne);
router.post('/', verifyToken, isAdmin, upload.fields([
    { name: 'photos', maxCount: 10 }
  ]),controller.create);
router.put('/:id', verifyToken, isAdmin, upload.fields([
    { name: 'photos', maxCount: 10 }
  ]), controller.update);
router.delete('/:id', verifyToken, isAdmin, controller.delete);

module.exports = router;
