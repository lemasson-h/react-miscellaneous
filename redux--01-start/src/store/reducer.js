import * as actionTypes from './actions';

const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.value
      };
    case actionTypes.SUBSTRACT:
      return {
        ...state,
        counter: state.counter - action.value
      };
    case actionTypes.STORE_RESULT:
      const results1 = [...state.results];

      results1.push({id: new Date(), value: state.counter});

      return {
        ...state,
        results: results1
      };
    case actionTypes.DELETE:
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
