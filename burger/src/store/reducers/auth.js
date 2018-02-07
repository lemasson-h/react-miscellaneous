import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error:null,
  loading:null,
  redirectPath: "/",
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
  };
}

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
}

const logOut = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
  };
}

const authChangeRedirectPath = (state, action) => {
  return {
    ...state,
    redirectPath: action.path,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logOut(state, action);
    case actionTypes.AUTH_CHANGE_REDIRECT_PATH:
      return authChangeRedirectPath(state, action);
    default:
      return state;
  }
}

export default reducer;
