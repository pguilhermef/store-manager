const express = require('express');
const salesControllers = require('../controllers/salesControllers');

const router = express.Router();

router.get(
  '/',
  salesControllers.getAllSalesController,
);

router.get(
  '/:id',
  salesControllers.getSaleByIdController,
);

router.post(
  '/',
  salesControllers.createNewSaleController,
);

module.exports = router;
