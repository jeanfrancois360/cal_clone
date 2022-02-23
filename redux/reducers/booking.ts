import { PlaylistAddOutlined } from '@mui/icons-material';
import { types } from '../actions/types';

const initialState: any = {
  events: [],
  booking_message: '',
};

const event = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.ADD_EVENT_SUCCESS:
      return {
        ...state,
        booking_message: 'booked'
      };
      case types.GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload
      };
    case types.SET_ERRORS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default event;
