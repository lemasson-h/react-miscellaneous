import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 0,
  purchasable: false,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const calculatePurchasable = (ingredients) => {
  const sum = Object.keys(ingredients)
    .map(
      (ingredientName) => {
        return ingredients[ingredientName];
      }
    )
    .reduce(
      (prev, next) => {
        return prev + next;
      },
      0
    );

  return sum > 0;
}

const addIngredient = (state, action) => {
  const oldCount = state.ingredients[action.ingredientName];
  const updatedCount = oldCount + 1;
  const updatedIngredients = {
    ...state.ingredients
  };
  const priceAddition = INGREDIENT_PRICES[action.ingredientName];
  const newTotalPrice = state.totalPrice + priceAddition;

  updatedIngredients[action.ingredientName] = updatedCount;
  const purchasable = calculatePurchasable(updatedIngredients);

  return {
    ...state,
    totalPrice: newTotalPrice,
    ingredients: updatedIngredients,
    purchasable: purchasable,
  };
}

const removeIngredient = (state, action) => {
  const oldCount = state.ingredients[action.ingredientName];

  if (oldCount <= 0) {
    return ;
  }

  const updatedCount = oldCount - 1;
  const priceAddition = INGREDIENT_PRICES[action.ingredientName];
  const newTotalPrice = state.totalPrice - priceAddition;
  const updatedIngredients = {
    ...state.ingredients
  };

  updatedIngredients[action.ingredientName] = updatedCount;
  const purchasable = calculatePurchasable(updatedIngredients);

  return {
    ...state,
    totalPrice: newTotalPrice,
    ingredients: updatedIngredients,
    purchasable: purchasable,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.INITIALIZE_INGREDIENTS:
      return {...state, ingredients: action.ingredients, error: false};
    case actionTypes.ERROR_INGREDIENTS:
      return {...state, error: true};
    default:
      return state;
  }
}

export default reducer;
