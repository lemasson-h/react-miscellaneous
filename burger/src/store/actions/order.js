import * as actionTypes from './actionTypes';

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
}

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData,
  };
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
}

export const purchaseBurger = (orderData, userToken) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    userToken: userToken,
  };
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
}

export const initializeOrdersSuccess = (orders) => {
  return {
    type: actionTypes.INITIALIZE_ORDERS_SUCCESS,
    orders: orders,
  };
}

export const initializeOrdersFail = (error) => {
  return {
    type: actionTypes.INITIALIZE_ORDERS_FAIL,
    error: error,
  };
}

export const initializeOrdersStart = () => {
  return {
    type: actionTypes.INITIALIZE_ORDERS_START
  };
}

export const loadOrders = (userToken, userId) => {
  return {
    type: actionTypes.LOAD_ORDERS,
    userToken: userToken,
    userId: userId,
  };
}
