import React from 'react'

// import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

import classes from './Order.module.css';

const Order = (props) => {
    // const ingredients = Object.keys(props.ingredients)
    //     .map( igkey => {
    //         console.log(igkey, props.ingredients[igkey])
    //         // return [...Array(props.ingredients[igkey])].map((_, i) => {
    //         //     return <BurgerIngredient key={igkey + i} type={igkey} />
    //         // })
    //     })
    //     .reduce( (prev, curr) => {
    //         return prev.concat(curr)
    //     }, []);

    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push( { name: ingredientName, amount: props.ingredients[ingredientName] })
    }
    console.log(ingredients);

    const ingredientOutput = ingredients.map( ig => {
        return <span 
            style= {{ 
                textTransform: 'capitalize', 
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #eee',
                padding: '5px',
            }}
            key={ig.name} >{ig.name} ({ig.amount})</span>
    })
    
    return (
        <div className={classes.Order}>
            {ingredientOutput}
            <p>Price: ${props.price.toFixed(2)}</p>
        </div>
    )
}

export default Order
