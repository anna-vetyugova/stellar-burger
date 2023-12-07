const currentIngredients = {
  bun: null,
  ingredients: null
};
const updatedIngredints = [];

export const constructorIngredientsReducer = (state = currentIngredients, action) => {
  switch (action.type) {
    case 'ADD_BUN_INGREDIENT': {
      return { 
        ...state,
        bun: action.ingredient._id 
      }  
    }
    case 'ADD_MAIN_INGREDIENT': {
      updatedIngredints.push(action.ingredient._id);
      return { 
        ...state,
        ingredients: updatedIngredints
      }  
    }
    default: {
      return state;
    }
  }
};

