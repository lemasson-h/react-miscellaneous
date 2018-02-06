import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

const purchaseBurgerStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
}

const purchaseBurgerSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: state.orders.concat({
      ...action.orderData,
      id: action.id
    }),
    purchased: true,
  };
}

const purchaseBurgerFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
}

const purchaseInit = (state, action) => {
  return {
    ...state,
    purchased: false,
  };
}

const initializeOrdersStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
}

const initializeOrdersSuccess = (state, action) => {
    return {
      ...state,
      orders: action.orders,
      loading: false,
    };
}

const initializeOrdersFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.INITIALIZE_ORDERS_START:
      return initializeOrdersStart(state, action);
    case actionTypes.INITIALIZE_ORDERS_SUCCESS:
      return initializeOrdersSuccess(state, action);
    case actionTypes.INITIALIZE_ORDERS_FAIL:
      return initializeOrdersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
