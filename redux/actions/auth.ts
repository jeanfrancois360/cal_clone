import axios from 'axios';

import { types } from './types';
import { setErrors, clearErrors } from './errors';
import { openLoader, closeLoader } from "./loader";

export const signIn =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: any) => {
    dispatch(clearErrors());
    dispatch(openLoader());
    try {
      const { data } = await axios.post(
        '/api/auth/signin',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('access_token', data.access_token);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: data,
      });
      dispatch(closeLoader());
    } catch (error: any) {
      dispatch(clearErrors());
      dispatch(
        setErrors(
          `${error ? error.response.data.error : 'Something went wrong, try again later!'}`
        )
      );
      dispatch(closeLoader());
    }
  };

export const signUp =
  ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) =>
  async (dispatch: any) => {
    dispatch(clearErrors());
    dispatch(openLoader());
    try {
      const { data } = await axios.post(
        '/api/auth/signup',
        { username, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('access_token', data.access_token);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: data,
      });
      dispatch(closeLoader());
    } catch (error: any) {
      dispatch(clearErrors());
      dispatch(
        setErrors(
          `${error ? error.response.data.error : 'Something went wrong, try again later!'}`
        )
      );
      dispatch(closeLoader());
    }
  };


