import * as actionTypes from './actionTypes';
import Axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
}


const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
}

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
}

export const authenticate = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD9rvJ3sXBiFR8oODUd5lYu_HHAQoUT_a0';

    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD9rvJ3sXBiFR8oODUd5lYu_HHAQoUT_a0';
    }

    Axios.post(
      url,
      authData
    )
      .then(response => {
        const expirationDate = new Date((new Date()).getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('user_id', response.data.localId);
        localStorage.setItem('expiration_date', expirationDate);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime *  1000); //Convert second to millisecond
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('expiration_date');

  return {
    type: actionTypes.AUTH_LOGOUT,
  }
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
