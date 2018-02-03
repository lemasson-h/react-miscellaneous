import * as actions from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: 0,
  purchasable: false,
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
    case actions.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actions.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    default:
      return state;
  }

  return state;
}

export default reducer;
