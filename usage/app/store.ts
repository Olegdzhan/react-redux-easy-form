import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// const myForms = getFormsReducer(Forms);

const rootReducer = combineReducers({
  response: (state = { firstName: 'oleg' }, action) => state,
});

export const store = createStore(rootReducer, {}, composeWithDevTools());
