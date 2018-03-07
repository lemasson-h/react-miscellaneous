import { put } from 'redux-saga/effects';

import * as actionCreators from '../actions';
import AxiosOrder from '../../AxiosOrder';

export function* purchaseBurgerSaga(action) {
  yield put(actionCreators.purchaseBurgerStart());

  try {
    const response = yield AxiosOrder.post('/orders.json?auth=' + action.userToken, action.orderData);

    yield put(actionCreators.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch(error) {
    yield put(actionCreators.purchaseBurgerFail(error));
  }
}

export function* loadOrdersSaga(action) {
  yield put(actionCreators.initializeOrdersStart());

  const queryParams = '?auth=' + action.userToken + '&orderBy="userId"&equalTo="' + action.userId + '"';

  try {
    const response = yield AxiosOrder.get('/orders.json' + queryParams);
    const fetchedOrders = [];

    for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        });
    }

    yield put(actionCreators.initializeOrdersSuccess(fetchedOrders));
  } catch(err) {
    yield put(actionCreators.initializeOrdersFail(err));
  }
}
