import {
  AnyAction,
  applyMiddleware,
  createStore,
  combineReducers,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { easyFormMiddleware, easyFormReducer } from '@/src';
import { TAppState } from './app-types';

const responseReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case 'SET_RESPONSE':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  forms: easyFormReducer,
  response: responseReducer,
});

export const store: Store<Partial<TAppState>> = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(easyFormMiddleware),
  ),
);
