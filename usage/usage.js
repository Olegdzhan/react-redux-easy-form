// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Usage from './app/Usage';
import store from './app/store';

const container = document.getElementById('react-redux-easy-form-usage');

if (container) {
  render(
    (
      <Provider store={store}>
        <Usage />
      </Provider>
    ),
    container,
  );
} else {
  throw new Error('Application html template must contain a dom-element with id #react-redux-easy-form-usage');
}
