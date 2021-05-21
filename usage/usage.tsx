import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { FormUsage } from './app/form-usage';
import { store } from './app/store';

render(
  (
    <Provider store={store}>
      <FormUsage />
    </Provider>
  ),
  document.getElementById('easy-form-usage'),
);
