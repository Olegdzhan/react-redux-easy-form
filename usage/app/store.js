import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFormsReducer } from 'lib';
import { Forms } from './constants';

const forms = getFormsReducer(Forms);

const rootReducer = combineReducers({
  forms,
  response: (state = { firstName: 'oleg' }, action) => state
});

export default createStore(rootReducer, {}, composeWithDevTools());