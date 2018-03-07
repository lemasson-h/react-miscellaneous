import { put } from 'redux-saga/effects';

import * as actionCreators from '../actions';
import AxiosOrder from '../../AxiosOrder';

export function* loadIngredientsSaga(action) {
  try {
    const response = yield AxiosOrder.get('https://burger-hl.firebaseio.com/ingredients.json');

    yield put(actionCreators.initializeIngredients(response.data));
  } catch(error) {
      yield put(actionCreators.failToLoadIngredients(error));
  };
}
