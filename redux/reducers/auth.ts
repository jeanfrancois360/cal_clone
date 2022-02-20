import { types } from '../actions/types';
import { AuthState } from '../types';

const initialState: AuthState = {
  isLoading: false,
  isAuth: false,
  token: '',
  user: {
    username: '',
    email: '',
  },
  message: '',
};

const Signup = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
        return{
            ...state,
        }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
      };
    case types.SET_ERRORS:
      return {
        ...state,
      };
    case types.IS_LOADING:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default Signup;
