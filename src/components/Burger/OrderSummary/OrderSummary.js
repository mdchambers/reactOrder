import React, { Component } from 'react';
// import { Link } from 'react-router-dom';


import classes from './OrderSummary.module.css';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate () {
        // console.log("[OrderSummary] updated");
    }
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map( (v, i) => {
        return (
            <li key={v}>
                <span>{v}</span>: {this.props.ingredients[v]}
            </li>
        )
        });
        return(
            <div className={classes.OrderSummary}>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h4>Total: ${this.props.price.toFixed(2)}</h4>
                <p>Continue to checkout?</p>
                <Button btntype='Success' clicked={this.props.purchaseContinueHandler}>Checkout</Button>
                <Button btntype='Danger' clicked={this.props.purchaseCancelHandler}>Cancel</Button>
            </div>
        )
    }

}

export default OrderSummary;