import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';

// import axios from 'axios';
import dbase from '../../axios-orders';
// import axios from 'axios';


class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalPrice: 0,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount () {
        // dbase.get('/ingredients.json')
        //     .then( res => {
        //         // console.log(res);
        //         // console.log(res.data);
        //         this.setState( { ingredients: res.data }, () => { 
        //             this.updatePurchaseState(res.data);
        //             this.updatePrice();
        //         });

        //     })
        //     .catch( err => { this.setState({ error: true })})
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    }

    purchaseContinueHandler = () => {
        this.setState({
            purchasing: false,
        });
        // console.log("in purchase");
        // const queryParams = [];
        // for(let i in this.props.ingredients){
        //     queryParams.push( encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i] ))
        // }
        // queryParams.push('totalPrice=' + this.props.totalPrice);
        // // console.log(queryParams);
        // const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            // search: "?" + queryString,
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Set order summary for modal, if not waiting for server response and ingredients are loaded
        let orderSummary = <Spinner />
        if( ! this.state.loading ){
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ingredients}
                    price={this.props.totalPrice}
                    purchaseContinueHandler={this.purchaseContinueHandler}
                    purchaseCancelHandler={this.purchaseCancelHandler}
                />
            )
        }

        // Check if burger default loaded, then display
        let burger = this.state.error ? <h2>Ingredients cannot be loaded</h2> : <Spinner />;
        if( this.props.ingredients ){
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.props.addIngredientHandler}
                        ingredientRemoved={this.props.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.purchasable}
                        purchaseHandler={this.purchaseHandler}
                    />
                </React.Fragment>  
            )
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (type) => dispatch({ type: actionTypes.UPDATE_INGREDIENT, ingredientType: type, ingredientDelta: 1}),
        removeIngredientHandler: (type) => dispatch({ type: actionTypes.UPDATE_INGREDIENT, ingredientType: type, ingredientDelta: -1}),
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), dbase);