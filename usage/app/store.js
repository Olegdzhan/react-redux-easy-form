// @flow
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFormsReducer } from '../../lib';
import { FormsMap } from './constants';

const forms = getFormsReducer(FormsMap);

export type TAppState = {
  response: {
    firstName: string;
  },
};

export const initialState: TAppState = {
  forms: {},
  response: {
    firstName: 'oleg',
  },
};

const rootReducer = combineReducers({
  forms,
  response: state => ({ ...state, firstName: 'oleg' }),
});

export default createStore(rootReducer, initialState, composeWithDevTools());
