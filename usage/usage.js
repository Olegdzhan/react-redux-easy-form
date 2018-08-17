import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Usage from './app/Usage';
import store from './app/store';

render(
  (
    <Provider store={store}>
      <Usage/>
    </Provider>
  ),
  document.getElementById('react-redux-easy-form-usage')
);