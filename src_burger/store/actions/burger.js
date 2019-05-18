import * as actionTypes from './actionTypes';

import dbase from '../../axios-orders';

export const updateIngredient = (ingType, ingVal) => {
    return {
        type: actionTypes.UPDATE_INGREDIENT,
        ingredientType: ingType,
        ingredientDelta: ingVal
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        dbase.get('/ingredients.json')
        .then( res => {
            console.log(res.data)
            for(let ing in res.data){
                dispatch(updateIngredient(ing, res.data[ing]))
            }
        })
        .catch( err => { console.log(err) })
    }
}