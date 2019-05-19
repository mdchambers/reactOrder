import React, { Component } from "react";
// import dbase from "../../axios-orders";

import { Redirect } from 'react-router';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

import classes from "./ContactData.module.css";

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zip: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validation: {
          required: true
        },
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };

  orderHandler = event => {
    // Stop form from reloading page
    event.preventDefault();

    // Prepare customer data
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    // Set loading state
    this.setState({ loading: true });
    // Prepare order
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      uid: this.props.uid,
    };

    // Post order
    this.props.sendOrder(order, this.props.token);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = isValid && value.trim() !== "";
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
    console.log(valid);
    return valid;
  }

  inputChangedHandler = (event, ele_id) => {
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    // Clones are shallow, copy individual element to get deep copy of one element (of 'value')
    const updatedFormElement = {
      ...updatedOrderForm[ele_id]
    };

    // Update value and put in new order form
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    // console.log(updatedFormElement);
    updatedOrderForm[ele_id] = updatedFormElement;
    const newFormIsValid = this.checkFormValidity(updatedOrderForm);
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: newFormIsValid
    });
    // update form validity
  };

  render() {
    // If ordering done, redirect
    if(this.props.orderSubmitted){
      return <Redirect to='/' />
    }

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        key: key,
        config: this.state.orderForm[key]
      });
    }
    const order = (
      <React.Fragment>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(ele => {
            // console.log(ele);
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
            ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    return (
      <div className={classes.ContactData}>
        {this.state.loading ? <Spinner /> : order}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.brg.ingredients,
    price: state.brg.totalPrice,
    uid: state.auth.uid,
    loading: state.ord.checkoutLoading,
    orderSubmitted: state.ord.orderSubmitted,
    token: state.auth.idToken
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    sendOrder: (order, token) => dispatch(actions.sendOrder(order, token) )
  }
}


export default connect(mapStateToProps, mapDispathToProps)(ContactData);
