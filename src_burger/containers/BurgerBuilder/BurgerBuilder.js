import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';

// import axios from 'axios';
import dbase from '../../axios-orders';
// import axios from 'axios';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount () {
        dbase.get('/ingredients.json')
            .then( res => {
                // console.log(res);
                // console.log(res.data);
                this.setState( { ingredients: res.data }, () => { 
                    this.updatePurchaseState(res.data);
                    this.updatePrice();
                });

            })
            .catch( err => { this.setState({ error: true })})
    }

    updatePrice = () => {
        console.log("[BB] price updated" + this.state.ingredients);
        let price = 0;
        price += this.state.ingredients.salad * INGREDIENT_PRICES.salad;
        price += this.state.ingredients.cheese * INGREDIENT_PRICES.cheese;
        price += this.state.ingredients.meat * INGREDIENT_PRICES.meat;
        price += this.state.ingredients.bacon * INGREDIENT_PRICES.bacon;

        this.setState({
            totalPrice: price,
        })
    }

    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.values(updatedIngredients).reduce( (partial, a) => partial + a , 0);

        const purchasable = sum > 0;
        // console.log("[BurgerBuilder.js] " + sum + " " + purchasable);
        this.setState({
            purchasable: purchasable,
        })
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        this.setState({
            ingredients: updatedIngredients
        },
        () => {
            this.updatePurchaseState(updatedIngredients);
            this.updatePrice();
        });

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        
        this.setState({
            ingredients: updatedIngredients
        },
        () => {
            this.updatePurchaseState(updatedIngredients);
            this.updatePrice();
        });
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
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push( encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i] ))
        }
        queryParams.push('totalPrice=' + this.state.totalPrice);
        // console.log(queryParams);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: "?" + queryString,
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // Set order summary for modal, if not waiting for server response and ingredients are loaded
        let orderSummary = <Spinner />
        if( ! this.state.loading && this.state.ingredients ){
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseContinueHandler={this.purchaseContinueHandler}
                    purchaseCancelHandler={this.purchaseCancelHandler}
                />
            )
        }

        // Check if burger default loaded, then display
        let burger = this.state.error ? <h2>Ingredients cannot be loaded</h2> : <Spinner />;
        if( this.state.ingredients ){
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder, dbase);