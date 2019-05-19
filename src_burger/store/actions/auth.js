import axios from 'axios';

import * as apiKeys from '../../private/sensitive';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (localId, idToken, refreshToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        localId: localId,
        idToken: idToken,
        refreshToken: refreshToken,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate ')
    localStorage.removeItem('uid ')
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        // console.log("time: " + expirationTime);
        setTimeout(() => {
            // console.log("auth timeout");
            dispatch(logout());
        }, +expirationTime * 1000);
    }
}

export const auth = (email, password, isSignin) => {
    return dispatch => {
        dispatch(authStart());
        const signUpURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKeys.firebaseAPI;
        const signInURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKeys.firebaseAPI;
        // console.log(isSignin);
        const url = isSignin ? signInURL : signUpURL
        axios.post(url,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .then( res => {
            // console.log(res.data);
            const expirationDate = new Date( new Date().getTime() + res.data.expiresIn * 1000 );
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('uid', res.data.localId);
            dispatch(authSuccess(res.data.localId, res.data.idToken, res.data.refreshToken));
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch( err => {
            // console.log(err);
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if( !token ){
            // console.log("no token");
            dispatch(logout());
        } else {
            const expirationTime = new Date( localStorage.getItem('expirationDate') );
            if(expirationTime > new Date() ){
                dispatch( authSuccess( localStorage.getItem('uid'), token) )
                // console.log(new Date () );
                // console.log(expirationTime)
                dispatch( checkAuthTimeout( (expirationTime.getTime() - new Date().getTime()) / 1000 ) )
            } else {
                // console.log("token expired");
                dispatch(logout());
            }
        }
    }
}