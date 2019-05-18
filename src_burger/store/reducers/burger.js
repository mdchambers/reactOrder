import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const updatePrice = ingredients => {
  // console.log("[BB] price updated" + this.state.ingredients);
  let price = 0;
  price += ingredients.salad * INGREDIENT_PRICES.salad;
  price += ingredients.cheese * INGREDIENT_PRICES.cheese;
  price += ingredients.meat * INGREDIENT_PRICES.meat;
  price += ingredients.bacon * INGREDIENT_PRICES.bacon;
  return price;
};


const initialIngredients = {
  salad: 0,
  cheese: 0,
  bacon: 0,
  meat: 0
};

const initialState = {
  ingredients: initialIngredients,
  totalPrice: 0,
  purchasable: false,
  loading: true
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_INGREDIENT:
      const newCount = state.ingredients ? state.ingredients[action.ingredientType] + action.ingredientDelta : action.ingredientDelta;
      if( newCount < 0 ){
        return({ ...state })
      }
      const newIngredients = { ...state.ingredients };
      newIngredients[action.ingredientType] = newCount;
      // update price and purchasable
      const newPrice = updatePrice(newIngredients);
      const newPurchasable = newPrice > 0;
      // console.log(newIngredients);

      return {
        ...state,
        ingredients: newIngredients,
        totalPrice: newPrice,
        purchasable: newPurchasable,
        loading: false
      };
    case actionTypes.TOGGLE_PURCHASABLE:
      break;
    default:
      return state;
  }
};

export default reducer;
