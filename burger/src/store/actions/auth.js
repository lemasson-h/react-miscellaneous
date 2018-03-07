import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
}

export const authenticate = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_LOGIN,
    email: email,
    password: password,
    isSignup: isSignup,
  };
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCEED
  };
}

export const authChangeRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_CHANGE_REDIRECT_PATH,
    path: path,
  };
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      return ;
    }

    const expirationDate = new Date(localStorage.getItem('expiration_date'));

    if (expirationDate <= new Date()) {
        return dispatch(logout());
    }

    dispatch(authSuccess(token, localStorage.getItem('user_id')));
    dispatch(checkAuthTimeout((expirationDate.getTime() - (new Date()).getTime()) / 1000));
  }
}
