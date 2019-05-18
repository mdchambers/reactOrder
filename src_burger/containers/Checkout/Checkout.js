import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

class Checkout extends Component {

  componentWillMount() {
    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // let price = 0;
    // for(let param of query.entries() ){
    //   if( param[0] !== "totalPrice") {
    //     ingredients[param[0]] = +param[1];
    //   } else {
    //     price = +param[1];
    //   }
    // }
    // console.log(ingredients)
    // this.setState({ ingredients: ingredients, price: price });
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
          ingredients={this.props.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      ingredients: state.brg.ingredients,
      price: state.brg.totalPrice,
  }
}

export default connect(mapStateToProps)(Checkout);

