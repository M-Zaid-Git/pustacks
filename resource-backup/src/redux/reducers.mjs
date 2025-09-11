import { combineReducers } from 'redux';

// Import reducers
import counterReducer from './counterReducer.mjs';
import authReducer from './authReducer.js';
import userReducer from './userReducer.js';
import materialReducer from './materialReducer.js';

export default combineReducers({
  // Add Reducers here
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
  material: materialReducer,
});
