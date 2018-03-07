import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { authCheckStateSaga, authenticateSaga, checkAuthTimeoutSaga, logoutSaga } from './auth';
import { loadIngredientsSaga } from './burgerBuilder';
import { loadOrdersSaga, purchaseBurgerSaga } from './order';

function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_LOGIN, authenticateSaga);
  yield takeEvery(actionTypes.AUTH_AUTO_LOGIN, authCheckStateSaga);
}

function* watchBugerBuilder() {
  yield takeEvery(actionTypes.LOAD_INGREDIENTS, loadIngredientsSaga);
}

function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.LOAD_ORDERS, loadOrdersSaga);
}

const applySagas = (sagaMiddleware) => {
  sagaMiddleware.run(watchAuth);
  sagaMiddleware.run(watchBugerBuilder);
  sagaMiddleware.run(watchOrder);
}

export default applySagas;
