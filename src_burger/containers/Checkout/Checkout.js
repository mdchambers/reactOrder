import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

export default class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0,
    };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for(let param of query.entries() ){
      if( param[0] !== "totalPrice") {
        ingredients[param[0]] = +param[1];
      } else {
        price = +param[1];
      }
    }
    console.log(ingredients)
    this.setState({ ingredients: ingredients, price: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.path + "/contact-data"}
          render={ (props) => { return <ContactData ingredients={this.state.ingredients} totalPrice={this.state.price} {...props} /> }}
        />
      </div>
    )
  }
}
