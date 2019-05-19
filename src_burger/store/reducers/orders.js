import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    ordersLoading: true,
    checkoutLoading: false,
    orderSubmitted: false
}


const storeOrder = (state, action) => {
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
        checkoutLoading: false
    } 
}

const orderStart = (state, action) => {
  return {
      ...state,
      checkoutLoading: true
  }
}
const orderSuccess = (state, action) => {
  return {
      ...state,
      checkoutLoading: false,
      orderSubmitted: true,
  }
}
const orderFail = (state, action) => {
  return {
      ...state,
      checkoutLoading: false,
      checkoutError: action.error
  }
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_ORDERS: return storeOrder(state, action)
        case actionTypes.ORDER_START: return orderStart(state, action)
        case actionTypes.ORDER_SUCCESS: return orderSuccess(state, action)
        case actionTypes.ORDER_FAIL: return orderFail(state, action)
        default:
            break;
    }
    return state
};
  
export default reducer;