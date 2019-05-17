import * as actionTypes from './actionTypes';

// Using action creators
// Better for async code

export const storeResult = (val) => {
    return {
        type: actionTypes.STORE,
        val: val
    }
}

export const storeResultAsync = (val) => {
    return  (dispatch) => {
        setTimeout( () => {
            dispatch(storeResult(val))
        }, 2000)
    }
};

export const deleteResult = (idx) => {
    return {
        type: actionTypes.DELETE,
        idx: idx
    }
};