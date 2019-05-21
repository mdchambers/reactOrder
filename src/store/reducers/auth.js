import * as actionTypes from "../actions/actionTypes";

const initialState = {
  uid: null,
  idToken: null,
  refreshToken: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null
  };
};

const authFail = (state, action) => {
  console.log("[auth] fail");
//   console.log("error", action.error.message );
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const authSuccess = (state, action) => {
  // console.log('[auth] success')
  // console.log('[auth]', action.authData.idToken)
  return {
    ...state,
    uid: action.localId,
    idToken: action.idToken,
    refreshToken: action.refreshToken,
    error: null,
    loading: false
  };
};

const authLogout = (state, action) => {
    return {
        ...state,
        uid: null,
        idToken: null,
        refreshToken: null,
    }
}

const authRedirect = (state, action) => {
  return {
    ...state,
    authRedirectPath: action.path,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_LOGOUT:
        return authLogout(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
        return authRedirect(state, action);

    default:
      return state;
  }
};

export default reducer;
