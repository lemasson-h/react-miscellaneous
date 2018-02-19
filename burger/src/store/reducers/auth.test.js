import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
          token: null,
          userId: null,
          error: null,
          loading: false,
          redirectPath: "/",
      });
    });

    it('should store the token upon login', () => {
      expect(reducer(
        undefined,
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 'tokenAbC',
          userId: '1905tqig',
        }
      )).toEqual({
          token: 'tokenAbC',
          userId: '1905tqig',
          error: null,
          loading: false,
          redirectPath: "/",
      });
    })
});
