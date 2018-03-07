import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as actionCreators from '../actions';
import Axios from 'axios';

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

export function* authenticateSaga(action) {
    yield put(actionCreators.authStart());

    const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true,
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD9rvJ3sXBiFR8oODUd5lYu_HHAQoUT_a0';

    if (!action.isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD9rvJ3sXBiFR8oODUd5lYu_HHAQoUT_a0';
    }

    try {
      const response = yield Axios.post(url, authData);

      const expirationDate = new Date((new Date()).getTime() + response.data.expiresIn * 1000);
      yield localStorage.setItem('token', response.data.idToken);
      yield localStorage.setItem('user_id', response.data.localId);
      yield localStorage.setItem('expiration_date', expirationDate);

      yield put(actionCreators.authSuccess(response.data.idToken, response.data.localId));
      yield put(actionCreators.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actionCreators.authFail(error.response.data.error));
    };
}
