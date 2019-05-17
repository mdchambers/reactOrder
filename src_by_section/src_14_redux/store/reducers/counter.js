import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../utility'

const initialState = {
    counter: 0,
}

const reducer = (state = initialState, action) => {

    let delta = 0;

    // Or copy using Object.assign
    // const newState = Object.assign({}, state);
    
    switch(action.type) {
        case actionTypes.INCREMENT:
            delta = 1;
            break
        case actionTypes.DECREMENT:
            delta = -1;
            break
        case actionTypes.ADD:
            delta = action.val;
            break
        case actionTypes.SUBTRACT:
            delta = -action.val;
            break
        default:
            break;
    }

    return updateObject(state, { counter: state.counter + delta})
}

export default reducer;