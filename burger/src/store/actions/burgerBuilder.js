import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const initializeIngredients = (ingredients) => {
  return {
    type: actionTypes.INITIALIZE_INGREDIENTS,
    ingredients: ingredients,
  };
}

export const failToLoadIngredients = (error) => {
  return {
    type: actionTypes.ERROR_INGREDIENTS,
    error: error,
  };
}

export const loadIngredients = () => {
    return {
      type: actionTypes.LOAD_INGREDIENTS,
    }
};
