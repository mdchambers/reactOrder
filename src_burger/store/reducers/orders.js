import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_ORDERS:
            console.log("storing orders");
            let fetchedOrders = [];
            for(let o in action.orders){
                fetchedOrders.push({
                    ...action.orders[o],
                    id: o,
                });
            }
            // console.log(fetchedOrders);
            return {
                ...state,
                orders: fetchedOrders,
                loading: false
            }
        default:
            break;
    }
    return state
};
  
export default reducer;