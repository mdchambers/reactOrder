import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./App.module.css";

import Layout from "../components/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Orders from "./Orders/Orders";
import Logout from "./Auth/Logout/Logout";

import * as actions from "../store/actions/index";

// Lazy load some components

const Checkout = React.lazy(() => import("./Checkout/Checkout"));
const Auth = React.lazy(() => import("./Auth/Auth"));

// TODO: convert App to func component
const App = props => {
  
  // TODO: auth to useReducer (or custom hook?)
  // Check if user authenticated on initial load
  const authCheckState = props.authCheckState;
  useEffect(() => {
    authCheckState();
  }, [authCheckState]);

  let routes = (
    <Switch>
      <Route
        path="/auth"
        render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
          </Suspense>
        )}
      />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route
          path="/auth"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
          )}
        />
        <Route
          path="/checkout"
          render={() => (
            <Suspense fallback={<div>Loading...</div>}>
              <Checkout />
            </Suspense>
          )}
        />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    );
  }

  return (
    <div className={classes.App}>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
