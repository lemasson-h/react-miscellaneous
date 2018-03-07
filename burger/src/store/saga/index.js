import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { authenticateSaga, checkAuthTimeoutSaga, logoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_LOGIN, authenticateSaga);
}
