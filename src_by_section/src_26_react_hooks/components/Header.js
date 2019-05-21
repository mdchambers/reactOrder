import React, { useContext } from "react";

import classes from "./Header.module.css";

import AuthContext from "../auth-context";

const Header = props => {
  const auth = useContext(AuthContext);
  console.log(auth);
  return (
    <React.Fragment>
      <div className={classes.Header}>
        <div className={classes.HeaderLeft}>
          {auth.status ? <p>logged in </p> : null}
        </div>
        <div className={classes.HeaderCenter}>
          <button onClick={props.onLoadTodos}>Todo List</button>
          <button onClick={props.onLoadAuth}>Auth</button>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Header;
