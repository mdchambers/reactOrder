import * as actionTypes from "./actionTypes";

import dbase from "../../axios-orders";

const storeOrders = orders => {
  return {
    type: actionTypes.STORE_ORDERS,
    orders: orders
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    // console.log(dbase.baseURL);
    const queryParams = '?auth=' + token + '&orderBy="uid"&equalTo="' + userId + '"';
    const reqURL = "/orders.json" + queryParams;
    // console.log("url: " + reqURL);
    dbase
      .get(reqURL)
      .then(res => {
        // console.log(res.data);
        // this.parseOrders(res.data);
        dispatch(storeOrders(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const orderStart = () => {
  return {
    type: actionTypes.ORDER_START
  };
};

const orderSuccess = () => {
  return {
    type: actionTypes.ORDER_SUCCESS
  };
};

const orderFail = (error) => {
  return {
    type: actionTypes.ORDER_FAIL,
    error: error
  };
};

export const sendOrder = (order, token) => {
  return dispatch => {
    dispatch(orderStart());
    const reqURL = "/orders.json?auth=" + token
    // console.log(reqURL, order)
    dbase
      .post(reqURL, order)
      .then(response => {
        // console.log(response);
        dispatch(orderSuccess());
        // this.setState({ loading: false });
        // this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        dispatch( orderFail(error) );
        // this.setState({ loading: false });
      });
  };
};
