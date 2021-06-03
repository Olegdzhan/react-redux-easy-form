import {
  applyMiddleware,
  createStore,
  combineReducers,
  Reducer,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { easyFormMiddleware, easyFormReducer } from '@/src';
import { TAppState } from './app-types';

const rootReducer: Reducer<Partial<TAppState>> = combineReducers({
  forms: easyFormReducer,
  response: (state = { fullName: 'Oleg Mukhov' }, action) => state,
});

export const store: Store<Partial<TAppState>> = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(easyFormMiddleware),
  ),
);
