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
                this.setState( { ingredients: res.data });
            })
            .catch( err => { this.setState({ error: true })})
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
        
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(updatedIngredients);
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
        
        const priceRemoval = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceRemoval;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(updatedIngredients);
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
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'mike',
                address: {
                    street: '100 Foo St',
                    city: 'Foo City',
                    zip: '11111',
                    country: 'Fooistan',
                },
                email: 'foo@foo.foo',
            },
            deliveryMethod: 'by fooing',
        };
        dbase.post('/orders.json', order)
            .then( response => { 
                console.log(response);
                this.setState({ loading: false, purchasing: false });
            })
            .catch( error => { 
                console.log(error);
                this.setState({ loading: false, purchasing: false });
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