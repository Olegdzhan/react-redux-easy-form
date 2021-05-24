import { createStore, combineReducers, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { easyFormReducer } from '@src/reducer';
import { TAppState } from './app-types';

const rootReducer: Reducer<Partial<TAppState>> = combineReducers({
  forms: easyFormReducer,
  response: (state = { fullName: 'Oleg Mukhov' }, action) => state,
});

export const store: Store<TAppState> = createStore(rootReducer, {}, composeWithDevTools());
