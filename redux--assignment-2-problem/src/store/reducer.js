import * as personActions from './actions/persons';

const initialState = {
  persons: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case personActions.ADD:
      return {
        ...state,
        persons: state.persons.concat({
            id: Math.random(), // not really unique but good enough here!
            name: action.name,
            age: action.age
          }),
      };
    case personActions.DELETE:
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== action.personId)
      };
    default:
      return state;
  }
}

export default reducer;
