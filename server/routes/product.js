import express from 'express';
const router = express.Router();

import {
  getAllProducts,
  getOfferProducts,
  getWithoutOfferProducts,
  getProductByName
} from './../controllers/product';

router.get('/all', getAllProducts);
router.get('/offers', getOfferProducts);
router.get('/without/offers', getWithoutOfferProducts);
router.get('/product', getProductByName);

module.exports = router;