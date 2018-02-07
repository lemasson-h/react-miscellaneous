import * as actionTypes from './actionTypes';
import AxiosOrder from '../../AxiosOrder';

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
}

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData,
  };
}

const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
}

export const purchaseBurger = (orderData, userToken) => {
  return dispatch => {
      dispatch(purchaseBurgerStart());

      AxiosOrder.post('/orders.json?auth=' + userToken, orderData)
        .then(response => {
          dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
          dispatch(purchaseBurgerFail(error));
        });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
}

const initializeOrdersSuccess = (orders) => {
  return {
    type: actionTypes.INITIALIZE_ORDERS_SUCCESS,
    orders: orders,
  };
}

const initializeOrdersFail = (error) => {
  return {
    type: actionTypes.INITIALIZE_ORDERS_FAIL,
    error: error,
  };
}

const initializeOrdersStart = () => {
  return {
    type: actionTypes.INITIALIZE_ORDERS_START
  };
}

export const loadOrders = (userToken, userId) => {
  return dispatch => {
      dispatch(initializeOrdersStart());

      const queryParams = '?auth=' + userToken + '&orderBy="userId"&equalTo="' + userId + '"';

      AxiosOrder.get('/orders.json' + queryParams)
        .then(response => {
          const fetchedOrders = [];
          for (let key in response.data) {
            fetchedOrders.push({
              ...response.data[key],
              id: key,
            });
          }

          dispatch(initializeOrdersSuccess(fetchedOrders));

          // this.setState({
          //   loading: false,
          //   orders: fetchedOrders,
          // });
        })
        .catch(err => {
          dispatch(initializeOrdersFail(err));
          // this.setState({loading: false});
        });
  }
}
