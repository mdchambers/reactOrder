import React, { Component } from 'react'

import * as actionCreators from '../../store/actions/orders';

import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {

    componentDidMount() {
        // Fetch orders
        console.log("[Orders] fetching orders");
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if( ! this.props.loading && this.props.orders){
            orders = (
                <React.Fragment>
                {this.props.orders.map( (order) => {
                    return <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                })}
                </React.Fragment>
            )
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.ord.orders,
        loading: state.ord.loading,
        token: state.auth.idToken,
        userId: state.auth.uid,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, uid) => dispatch(actionCreators.fetchOrders(token, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);