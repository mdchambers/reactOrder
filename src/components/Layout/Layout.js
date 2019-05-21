import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

export const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <React.Fragment>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        toggleSideDrawer={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        closed={sideDrawerClosedHandler}
        open={showSideDrawer}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  };
};

export default connect(mapStateToProps)(Layout);
