import * as actionTypes from '../actions';


const initialState = {
    results: [],
}

const reducer = (state = initialState, action) => {

    // let newResults = state.results.slice() //or .filter()
    const newResults = [...state.results];

    // Or copy using Object.assign
    // const newState = Object.assign({}, state);
    
    switch(action.type) {
        case actionTypes.STORE:
            newResults.push({id: new Date(), val: action.val });
            break
        case actionTypes.DELETE:
            newResults.splice(action.idx, 1)
            break
        default:
            break;
    }

    return {
        ...state,
        results: newResults,
    }
}

export default reducer;