import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export const FormUsage = React.memo(() => (
  <Provider store={store}>
    <h1>Form</h1>
  </Provider>
));
