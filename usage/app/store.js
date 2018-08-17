import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: (state, action) => state
});

export default createStore(rootReducer, {});