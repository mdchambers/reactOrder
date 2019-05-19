import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import * as actionCreators from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';

// import axios from 'axios';
import dbase from '../../axios-orders';
// import axios from 'axios';


export class BurgerBuilder extends Component {

    state = {
        // ingredients: null,
        // totalPrice: 0,
        // purchasable: false,
        purchasing: false,
        // loading: false,
        error: false,
    };

    componentDidMount () {
        if( this.props.loading) {
            this.props.fetchIngredients();
        }
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({
                purchasing: true,
            });
        } else {
            this.props.setAuthRedirectPath('/checkout'); 
            this.props.history.push({
                pathname: '/auth',
            })         
        }

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
        this.props.history.push({
            pathname: '/checkout',
        })  
        // if(this.state.isAuthenticated) {
        //     this.props.history.push({
        //         pathname: '/checkout',
        //     })    
        // } else {
        //     // Redirect to login
        //     this.props.history.push({
        //         pathname: '/auth',
        //     }) 
        // }
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
        if( ! this.props.loading ){
            // console.log('rendering ordersummary', this.props.loading)
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
        if( this.props.ingredients && ! this.props.loading ){
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
                        isAuthenticated={this.props.isAuthenticated}
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
        ingredients:        state.brg.ingredients,
        totalPrice:         state.brg.totalPrice,
        purchasable:        state.brg.purchasable,
        loading:            state.brg.loading,
        isAuthenticated:    state.auth.idToken !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (type, toAdd) => dispatch(actionCreators.updateIngredient(type, toAdd)),
        removeIngredientHandler: (type, toRemove) => dispatch(actionCreators.updateIngredient(type, -toRemove) ),
        fetchIngredients: () => dispatch(actionCreators.fetchIngredients() ),
        setAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path) ),
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), dbase);