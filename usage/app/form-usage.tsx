import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ProfileForm } from './profile';

export const FormUsage = React.memo(() => (
  <Provider store={store}>
    <h1>Form</h1>
    <ProfileForm />
  </Provider>
));
