import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { authCheckStateSaga, authenticateSaga, checkAuthTimeoutSaga, logoutSaga } from './auth';
import { loadIngredientsSaga } from './burgerBuilder';

function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_LOGIN, authenticateSaga);
  yield takeEvery(actionTypes.AUTH_AUTO_LOGIN, authCheckStateSaga);
}

function* watchBugerBuilder() {
  yield takeEvery(actionTypes.LOAD_INGREDIENTS, loadIngredientsSaga);
}

export function* sagas()
{
  let it = watchAuth();
  let obj = {done: false};

  while ((obj = it.next()).done === false) {
    yield obj.value;
  }

  it = watchBugerBuilder();
  while ((obj = it.next()).done === false) {
    yield obj.value;
  }
}
