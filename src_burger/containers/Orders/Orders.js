import React, { Component } from 'react'

import * as actionCreators from '../../store/actions/orders';

import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {

    componentDidMount() {
        // Fetch orders
        console.log("[Orders] fetching orders");
        this.props.fetchOrders();
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actionCreators.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);