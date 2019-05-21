import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { Redirect } from 'react-router-dom';

import * as actionCreators from "../../store/actions/index";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import Spinner from "../../components/UI/Spinner/Spinner";

// import axios from 'axios';
import dbase from "../../axios-orders";
// import axios from 'axios';

export const BurgerBuilder = props => {
  const [uiState, setUiState] = useState({
    purchasing: false,
    error: false
  });

  const [ loading, fetchIngredients] = [props.loading, props.fetchIngredients]
  useEffect(() => {
    if (loading) {
      fetchIngredients();
    }
  }, [loading, fetchIngredients]);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setUiState({
        ...uiState,
        purchasing: true
      });
    } else {
      props.setAuthRedirectPath("/checkout");
      props.history.push({
        pathname: "/auth"
      });
    }
  };

  const purchaseCancelHandler = () => {
    setUiState({
      ...uiState,
      purchasing: false
    });
  };

  const purchaseContinueHandler = () => {
    setUiState({
      ...uiState,
      purchasing: false
    });
    props.history.push({
      pathname: "/checkout"
    });
  };

  const disabledInfo = {
    ...props.ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  // Set order summary for modal, if not waiting for server response and ingredients are loaded
  let orderSummary = <Spinner />;
  if (!props.loading) {
    // console.log('rendering ordersummary', this.props.loading)
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        price={props.totalPrice}
        purchaseContinueHandler={purchaseContinueHandler}
        purchaseCancelHandler={purchaseCancelHandler}
      />
    );
  }

  // Check if burger default loaded, then display
  let burger = uiState.error ? (
    <h2>Ingredients cannot be loaded</h2>
  ) : (
    <Spinner />
  );
  if (props.ingredients && !props.loading) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          ingredientAdded={props.addIngredientHandler}
          ingredientRemoved={props.removeIngredientHandler}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchasable={props.purchasable}
          purchaseHandler={purchaseHandler}
          isAuthenticated={props.isAuthenticated}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Modal
        show={uiState.purchasing}
        modalClosed={purchaseCancelHandler}
      >
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.brg.ingredients,
    totalPrice: state.brg.totalPrice,
    purchasable: state.brg.purchasable,
    loading: state.brg.loading,
    isAuthenticated: state.auth.idToken !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: (type, toAdd) =>
      dispatch(actionCreators.updateIngredient(type, toAdd)),
    removeIngredientHandler: (type, toRemove) =>
      dispatch(actionCreators.updateIngredient(type, -toRemove)),
    fetchIngredients: () => dispatch(actionCreators.fetchIngredients()),
    setAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirectPath(path))
  };
};

export default withErrorHandler(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BurgerBuilder),
  dbase
);
