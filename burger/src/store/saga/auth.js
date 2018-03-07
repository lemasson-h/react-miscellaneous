import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as actionCreators from '../actions';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('user_id');
    yield localStorage.removeItem('expiration_date');

    yield put(actionCreators.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actionCreators.logout());
}
