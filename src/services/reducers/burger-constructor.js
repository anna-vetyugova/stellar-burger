import { DELETE_INGREDIENT } from "../actions/burger-constructor";
const currentIngredients = {
  bun: null,
  ingredients: []
};
const addedIngredints = [];

export const constructorIngredientsReducer = (state = currentIngredients, action) => {
  switch (action.type) {
    case 'ADD_BUN_INGREDIENT': {
      return { 
        ...state,
        bun: action.ingredient 
      }  
    }
    case 'ADD_MAIN_INGREDIENT': {
      const counter = state.ingredients.filter(item => item.ingredient._id === action.ingredient._id).length+1;
      action.ingredient.__v = counter;
      const newItem = { ingredient : action.ingredient, key: action.uniqueId };
      addedIngredints.push(newItem);
      return { 
        ...state,
        ingredients: addedIngredints
      }  
    }
    case DELETE_INGREDIENT: {
      const itemIndex = state.ingredients.reduce((prev, item, index) => {
        if (item.ingredient._id === action.id) {
          return index   
        }
        else return null
      },{});
      state.ingredients.splice(itemIndex, 1);
      const counterItem = state.ingredients.filter(item => item.ingredient._id === action.id);
      const counter = counterItem.length > 0 ? counterItem[0].ingredient.__v-- : null;
      return { 
        ...state
      }  
    }
    default: {
      return state;
    }
  }
};
