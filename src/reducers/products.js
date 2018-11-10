import { LOAD_OFFER_PRODUCTS,LOAD_WITHOUT_OFFER_PRODUCTS} from './../constants';
const defaultState = {
  withOffer:[],
  withoutOffer: []
};

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case LOAD_OFFER_PRODUCTS:
      const withOffer = [...state.withOffer, ...action.products];
       return {...state, withOffer};
    case LOAD_WITHOUT_OFFER_PRODUCTS:
    const withoutOffer = [...state.withoutOffer, ...action.products];
    return {...state, withoutOffer}; 
    default: return state;
  }
}

export default reducer;