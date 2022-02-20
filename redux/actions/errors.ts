import { types } from './types';

export const setErrors = (error: string) => {
  return {
    type: types.SET_ERRORS,
    payload: error,
  };
};

export const clearErrors = () => {
  return {
    type: types.CLEAR_ERRORS,
  };
};
