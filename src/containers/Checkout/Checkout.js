import React from 'react'
import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';

const Checkout = props => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

    return (
      <div>
        <h1>Checkout</h1>
        <CheckoutSummary 
          ingredients={props.ingredients}
          onCheckoutCancelled={checkoutCancelledHandler}
          onCheckoutContinued={checkoutContinuedHandler}
        />
        <Route 
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
      ingredients: state.brg.ingredients,
      price: state.brg.totalPrice,
  }
}

export default withRouter(connect(mapStateToProps)(Checkout));

