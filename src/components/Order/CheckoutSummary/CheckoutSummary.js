import React from 'react'

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
        <h1>Your Order</h1>
        <div style={{ width: "100%", margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button 
            btntype="Danger"
            clicked={props.onCheckoutCancelled}
        >CANCEL</Button>
        <Button 
            btntype="Success"
            clicked={props.onCheckoutContinued}
        >CONTINUE</Button>
    </div>
  )
}

export default CheckoutSummary
