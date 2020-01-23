// @flow

import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFormsReducer } from 'lib';
import { FormsMap } from './constants';

const myForms = getFormsReducer(FormsMap);

const rootReducer = combineReducers({
  myForms,
  response: (state = { firstName: 'oleg' }) => state
});

export default createStore(rootReducer, {}, composeWithDevTools());