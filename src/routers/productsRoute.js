const express = require('express');
const productsControllers = require('../controllers/productsControllers');

const router = express.Router();

router.get(
  '/',
  productsControllers.getAllProductsController,
);

router.get(
  '/:id',
  productsControllers.getProductByIdController,
);

router.post(
  '/',
  productsControllers.createNewProductController,
);

router.put(
  '/:id',
  productsControllers.updateProductController,
);

module.exports = router;
