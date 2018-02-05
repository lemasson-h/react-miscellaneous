import * as actionTypes from './actionTypes';
import AxiosOrder from '../../AxiosOrder';

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

const initializeIngredients = (ingredients) => {
  return {
    type: actionTypes.INITIALIZE_INGREDIENTS,
    ingredients: ingredients,
  };
}

const failToLoadIngredients = (error) => {
  return {
    type: actionTypes.ERROR_INGREDIENTS,
    error: error,
  };
}

export const loadIngredients = () => {
    return (dispatch) => {
      AxiosOrder.get('https://burger-hl.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(initializeIngredients(response.data));
        })
        .catch(error => {
            dispatch(failToLoadIngredients(error));
        });
    }
};
