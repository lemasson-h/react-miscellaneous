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
  return {
    type: actionTypes.AUTH_AUTO_LOGIN,
  };
}
