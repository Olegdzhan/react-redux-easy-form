// @flow

import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFormsReducer } from 'lib';
import { FormsMap } from './constants';

const forms = getFormsReducer(FormsMap);

export type TAppState = {
  firstName: string;
};

export const initialState: TAppState = {
  firstName: '',
};

const rootReducer = combineReducers({
  forms,
  response: (state: TAppState): TAppState => ({ ...state, firstName: 'oleg' }),
});

export default createStore(rootReducer, initialState, composeWithDevTools());
