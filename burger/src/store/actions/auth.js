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

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=MY_PRIVATE_KEY';

    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=MY_PRIVATE_KEY';
    }

    console.log(url);

    Axios.post(
      url,
      authData
    )
      .then(response => {
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
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}
