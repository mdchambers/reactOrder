import * as actionTypes from './actionTypes';

import dbase from '../../axios-orders';

const storeOrders = (orders) => {
    return {
        type: actionTypes.STORE_ORDERS,
        orders: orders,
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dbase.get('/orders.json')
            .then( res => {
                // console.log(res.data);
                // this.parseOrders(res.data);
                dispatch(storeOrders(res.data));
            })
            .catch( err => {
                console.log(err);
            })
    }
}