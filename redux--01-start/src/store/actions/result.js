import * as actionsTypes from './actionsTypes';

export const saveResult = (counter) => {
  // const updatedCounter = counter * 2;

  return {
    type: actionsTypes.STORE_RESULT,
    counter: counter,
  }
}

export const storeResult = (counter) => {
  return (dispatch, getState) => {
    setTimeout(
      () => {
        const oldCounter = getState().counterReducerState.counter;
        console.log(oldCounter);
        dispatch(saveResult(counter));
      },
      2000
    );
  }
};

export const deleteResult = (id) => {
  return {
    type: actionsTypes.DELETE_RESULT,
    id: id,
  };
};
