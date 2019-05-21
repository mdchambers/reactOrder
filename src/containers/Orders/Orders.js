import React, { useEffect } from "react";

import * as actionCreators from "../../store/actions/orders";

import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

export const Orders = props => {

  const [fetchOrders, token, userId] = [props.fetchOrders, props.token, props.userId]
  useEffect(() => {
    // Fetch orders
    console.log("[Orders] fetching orders");
    fetchOrders(token, userId);
  }, [fetchOrders, token, userId]);

  let orders = <Spinner />;
  if (!props.loading && props.orders) {
    orders = (
      <React.Fragment>
        {props.orders.map(order => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })}
      </React.Fragment>
    );
  }

  return <div>{orders}</div>;
};

const mapStateToProps = state => {
  return {
    orders: state.ord.orders,
    loading: state.ord.loading,
    token: state.auth.idToken,
    userId: state.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, uid) =>
      dispatch(actionCreators.fetchOrders(token, uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
