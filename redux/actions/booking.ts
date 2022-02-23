import axios from 'axios';

import { types } from './types';
import { setErrors, clearErrors } from './errors';
import { openLoader, closeLoader } from "./loader";
import { any } from 'joi';

export const AddEvent =
  ({ name, email, note, date, attendies }: { name: string, email: string; note: string, date: Date, attendies: any }) =>
  async (dispatch: any) => {
    dispatch(clearErrors());
    dispatch(openLoader());
    try {
      const { data } = await axios.post(
        '/api/booking/add_event',
        { name, email, note, date, attendies },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      dispatch({
        type: types.ADD_EVENT_SUCCESS,
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

export const GetEvents =
  () =>
  async (dispatch: any) => {
    const access_token = localStorage.getItem('access_token');
    dispatch(clearErrors());
    dispatch(openLoader());
    try {
      const res = await axios.get(
        '/api/booking/get_events',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${access_token}` 
          },
          
        }
      );
      dispatch({
        type: types.GET_EVENTS_SUCCESS,
        payload: res.data,
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
