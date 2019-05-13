import React, { Component } from 'react'
import dbase from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
    state = {
        orders: null,
        loading: true,
    }
    componentDidMount() {
        dbase.get('/orders.json')
            .then( res => {
                this.setState({ loading: false });
                console.log(res);
                this.parseOrders(res.data);
            })
            .catch( err => {
                this.setState({ loading: false });
                console.log(err);
            })
    }

    parseOrders(res) {
        let fetchedOrders = [];
        for(let o in res){
            fetchedOrders.push({
                ...res[o],
                id: o,
            });
        }
        console.log(fetchedOrders);
        this.setState({orders: fetchedOrders});
    }

    render() {
        let orders = <Spinner />;
        if( ! this.state.loading && this.state.orders){
            orders = (
                <React.Fragment>
                {this.state.orders.map( (order) => {
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

export default withErrorHandler(Orders, dbase)
