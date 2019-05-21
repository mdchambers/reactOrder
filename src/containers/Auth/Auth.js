import React, { useState } from "react";

import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import classes from "./Auth.module.css";

const Auth = props => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 7
      },
      valid: false,
      touched: false
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const [uiState, setUiState] = useState({
    loading: false,
    isSignin: true
  });

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = isValid && value.trim() !== "";
    }
    if (rules.isEmail) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = re.test(String(value).toLowerCase());
    }
    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }
    return isValid;
  };

  const checkFormValidity = orderForm => {
    let valid = true;
    for (let key in orderForm) {
      valid = valid && orderForm[key].valid;
    }
    // console.log(valid);
    return valid;
  };

  const inputChangedHandler = (event, ele_id) => {
    const updatedAuthForm = {
      ...authForm
    };
    // Clones are shallow, copy individual element to get deep copy of one element (of 'value')
    const updatedFormElement = {
      ...updatedAuthForm[ele_id]
    };

    // Update value and put in new order form
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAuthForm[ele_id] = updatedFormElement;
    const newFormIsValid = checkFormValidity(updatedAuthForm);
    setAuthForm(updatedAuthForm);
    // update form validity
    setFormIsValid(newFormIsValid);
  };

  const submitHandler = event => {
    event.preventDefault();
    const email = authForm.email.value;
    const pwd = authForm.password.value;
    props.onAuth(email, pwd, uiState.isSignin);
  };

  // Redirect if authenticated
  if (props.isAuthenticated) {
    return <Redirect to={props.authRedirectPath} />;
  }

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      key: key,
      config: authForm[key]
    });
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message.replace(/_/g, " ")}</p>;
  }

  const authFormOutput = (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        {formElementsArray.map(ele => {
          return (
            <Input
              key={ele.key}
              elementType={ele.config.elementType}
              elementConfig={ele.config.elementConfig}
              value={ele.config.value}
              valid={ele.config.valid || !ele.config.touched}
              changed={event => inputChangedHandler(event, ele.key)}
            />
          );
        })}
        <Button
          btntype="Success"
          clicked={submitHandler}
          disabled={! formIsValid}
        >
          {uiState.isSignin ? "LOGIN" : "SIGN UP"}
        </Button>
      </form>
      {errorMessage}
      <Button
        btntype="Success"
        clicked={() => {
          setUiState({
            ...uiState,
            isSignin: ! uiState.isSignin
          })
        }}
      >
        Switch to {uiState.isSignin ? "sign up" : "login"}
      </Button>
    </React.Fragment>
  );
  return (
    <div className={classes.AuthForm}>
      {props.loading ? <Spinner /> : authFormOutput}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignin) =>
      dispatch(actions.auth(email, password, isSignin))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
