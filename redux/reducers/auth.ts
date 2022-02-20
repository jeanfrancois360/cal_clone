import { PlaylistAddOutlined } from '@mui/icons-material';
import { types } from '../actions/types';
import { AuthState } from '../types';

const initialState: AuthState = {
  isAuth: false,
  access_token: '',
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
        isAuth: true,
        access_token: action.payload.access_token
      };
    case types.SET_ERRORS:
      return {
        ...state,
      };
  
    default:
      return state;
  }
};

export default Signup;
