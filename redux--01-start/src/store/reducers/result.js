import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      const results1 = [...state.results];

      results1.push({id: new Date(), value: action.counter});

      return {
        ...state,
        results: results1
      };
    case actionTypes.DELETE_RESULT:
      const results2 = state.results.filter(result => {
        return result.id !== action.id;
      });

      return {
        ...state,
        results: results2
      };
    }

  return state;
}

export default reducer;
