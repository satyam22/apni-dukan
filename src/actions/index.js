import { LOAD_OFFER_PRODUCTS, LOAD_WITHOUT_OFFER_PRODUCTS} from './../constants';

export const loadOfferProducts = (products) => ({
  type: LOAD_OFFER_PRODUCTS,
  products
});

export const loadWithoutOfferProducts = (products) => ({
  type: LOAD_WITHOUT_OFFER_PRODUCTS,
  products
});