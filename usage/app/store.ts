import {
  applyMiddleware,
  createStore,
  combineReducers,
  Store,
  Middleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { easyFormMiddleware, easyFormReducer } from '@/src';

const responseReducer = (state = {}, action: { type: 'SET_RESPONSE', payload: string }) => {
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

export const store: Store<any, any> = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(easyFormMiddleware as Middleware),
  ),
);
