import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
  const results2 = state.results.filter(result => {
    return result.id !== action.id;
  });

  return updateObject(
    state,
    {results: results2}
  );
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      const results1 = [...state.results];

      results1.push({id: new Date(), value: action.counter});

      return updateObject(
        state,
        {results: results1}
      );
    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);
    }

  return state;
}

export default reducer;
