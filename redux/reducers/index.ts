import { combineReducers } from 'redux';

import auth from './auth';
import error from './errors';
import loader from './loader';
import booking from './booking';

export default combineReducers({
  error,
  auth,
  loader,
  booking,
});
