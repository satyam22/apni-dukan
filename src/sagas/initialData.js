import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { loadOfferProducts,loadWithoutOfferProducts } from './../actions';

import { API_BASE_URL } from './../config';
let retryCount = 3;

export default function* loadInitialData() {
  while(retryCount !== 0){
   try {
     const offersResp = yield call(fetch, `${API_BASE_URL}/products/offers`);
     const withoutOffersResp = yield call(fetch, `${API_BASE_URL}/products/without/offers`);
     const { results: offerRes } = yield offersResp.json();
     const { results: withoutOfferRes } = yield withoutOffersResp.json();
     console.log({offerRes, withoutOfferRes });
     yield put(loadOfferProducts(offerRes))
     yield put (loadWithoutOfferProducts(withoutOfferRes));
     break;
   }
   catch (error) {
     console.log("In error")
     yield delay(1000*(4-retryCount));
    retryCount --; 
   }
  }
 }
 