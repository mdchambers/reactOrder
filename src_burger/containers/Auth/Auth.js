import React, { Component } from "react";

import { Redirect } from 'react-router-dom';

import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Auth.module.css';

class Auth extends Component {

  state = {
    authForm: {
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
          minLength: 7,
        },
        valid: false,
        touched: false
      },
    },
    loading: false,
    formIsValid: false,
    isSignin: true
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = isValid && value.trim() !== "";
    }
    if (rules.isEmail) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = re.test(String(value).toLowerCase());
    }
    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }
    return isValid;
  }

  checkFormValidity(orderForm) {
    let valid = true;
    for (let key in orderForm) {
      // console.log( this.state.orderForm[key].valid);
      valid = valid && orderForm[key].valid;
    }
    // console.log(valid);
    return valid;
  }

  inputChangedHandler = (event, ele_id) => {
    const updatedAuthForm = {
      ...this.state.authForm
    };
    // Clones are shallow, copy individual element to get deep copy of one element (of 'value')
    const updatedFormElement = {
      ...updatedAuthForm[ele_id]
    };

    // Update value and put in new order form
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAuthForm[ele_id] = updatedFormElement;
    const newFormIsValid = this.checkFormValidity(updatedAuthForm);
    this.setState({
      authForm: updatedAuthForm,
      formIsValid: newFormIsValid
    });
    // update form validity
  };

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.state.authForm.email.value;
    const pwd = this.state.authForm.password.value;
    this.props.onAuth(email, pwd, this.state.isSignin);
  };

  render() {
    // Redirect if authenticated
    if(this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />
    }


    const formElementsArray = [];
    for (let key in this.state.authForm) {
      formElementsArray.push({
        key: key,
        config: this.state.authForm[key]
      });
    }

    let errorMessage = null;
    if(this.props.error){
      errorMessage = <p>{this.props.error.message.replace(/_/g, ' ' )}</p>;
    }

    const authForm = (
      <React.Fragment>
        <form onSubmit={this.submitHandler}>
          {formElementsArray.map(ele => {
            return (
              <Input
                key={ele.key}
                elementType={ele.config.elementType}
                elementConfig={ele.config.elementConfig}
                value={ele.config.value}
                valid={ele.config.valid || !ele.config.touched}
                changed={event => this.inputChangedHandler(event, ele.key)}
              />
            );
          })}
          <Button
            btntype="Success"
            clicked={this.orderHandler}
            disabled={!this.state.formIsValid}
          >
            {this.state.isSignin ? 'LOGIN' : 'SIGN UP'}
          </Button>
        </form>
        {errorMessage}
        <Button 
          btntype="Success"
          clicked={() => { 
            this.setState( prevState => { 
              return {
                isSignin: ! prevState.isSignin
              }
            })}
          }
        >
          Switch to {this.state.isSignin ? 'sign up' : 'login'}
        </Button>
      </React.Fragment>
    );
    return (
      <div className={classes.AuthForm}>
        { this.props.loading ? <Spinner /> : authForm }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignin) => dispatch(actions.auth(email, password, isSignin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

