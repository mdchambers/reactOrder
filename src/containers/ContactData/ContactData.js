import React, { useState } from "react";
// import dbase from "../../axios-orders";

import { Redirect } from "react-router";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

import classes from "./ContactData.module.css";

export const ContactData = props => {
  const [formData, setFormData] = useState({
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
  });

  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    // Stop form from reloading page
    event.preventDefault();

    // Prepare customer data
    const orderData = {};
    for (let ele_id in formData) {
      orderData[ele_id] = formData[ele_id].value;
    }

    // Set loading state
    setLoading(true);

    // Prepare order
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: orderData,
      uid: props.uid
    };

    // Post order
    props.sendOrder(order, props.token);
  };

  const checkValidity = (value, rules) => {
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
  };

  const checkFormValidity = orderForm => {
    let valid = true;
    for (let key in orderForm) {
      // console.log( this.state.orderForm[key].valid);
      valid = valid && orderForm[key].valid;
    }
    console.log(valid);
    return valid;
  };

  const inputChangedHandler = (event, ele_id) => {
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...formData
    };
    // Clones are shallow, copy individual element to get deep copy of one element (of 'value')
    const updatedFormElement = {
      ...updatedOrderForm[ele_id]
    };

    // Update value and put in new order form
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    // console.log(updatedFormElement);
    updatedOrderForm[ele_id] = updatedFormElement;
    const newFormIsValid = checkFormValidity(updatedOrderForm);
    setFormData(updatedOrderForm);
    setFormIsValid(newFormIsValid);
  };

  // If ordering done, redirect
  if (props.orderSubmitted) {
    return <Redirect to="/" />;
  }

  const formElementsArray = [];
  for (let key in formData) {
    formElementsArray.push({
      key: key,
      config: formData[key]
    });
  }


  const order = (
    <React.Fragment>
      <h4>Enter your contact data</h4>
      <form onSubmit={orderHandler}>
        {formElementsArray.map(ele => {
          // console.log(ele);
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
          clicked={orderHandler}
          disabled={!formIsValid}
        >
          ORDER
        </Button>
      </form>
    </React.Fragment>
  );
  return (
    <div className={classes.ContactData}>
      {loading ? <Spinner /> : order}
    </div>
  );
};

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

const mapDispathToProps = dispatch => {
  return {
    sendOrder: (order, token) => dispatch(actions.sendOrder(order, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(ContactData);
