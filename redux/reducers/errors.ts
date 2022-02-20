import { types } from '../actions/types';

import { ErrorState } from '../types';

const initialState: ErrorState = {
  error: '',
};

const Errors = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.SET_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};

export default Errors;
