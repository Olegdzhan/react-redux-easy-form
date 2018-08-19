import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import pt from 'prop-types';
import { easyForm } from 'lib';
import { Forms } from './constants';

const formConfig = {
  formName: Forms.TEST_FORM_1,
  fields: {
    'firstName': {
      initialValue: ({ response }) => response.firstName,
      type: 'string',
      validateOnChange: true,
      errorMessage: 'First name must have more than 5 letters',
      validator: val => val && val.trim() && val.length > 5
    },
    'secondName': {
      initialValue: 'secondName',
      type: 'string',
      onChange: event => event.target.value + '_',
      validateOnChange: true,
      errorMessage: 'Second name is required',
      validator: val => val && val.trim()
    }
  },
  formValidator: ({ firstName, secondName }) => {
    if (firstName && secondName && firstName[0] === secondName[0]) {
      return ['First letters of firstName and secondName must not be equal'];
    }
    return [];
  }
};

@connect(({ response }) => ({ response }))
@easyForm(formConfig)
export default class Usage extends PureComponent {
  static propTypes = {
    getters: pt.exact({
      firstName: pt.func,
      secondName: pt.func
    }),
    setters: pt.exact({
      firstName: pt.func,
      secondName: pt.func
    }),
    response: pt.shape(),
    dropForm: pt.func,
    validateAll: pt.func
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      getters: {
        firstName,
        secondName
      },
      dropForm,
      validateAll
    } = this.props;
    if (validateAll()) {
      console.log({
        firstName: firstName(),
        secondName: secondName()
      });
      dropForm(Forms.TEST_FORM_1);
    }
  };

  render() {
    const {
      getters,
      setters
    } = this.props;
    return (
      <div>
        <h1>React Redux Easy Form</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={getters.firstName()}
            onChange={setters.firstName}
            placeholder="First Name"
          />
          <input
            type="text"
            value={getters.secondName()}
            onChange={setters.secondName}
            placeholder="Second Name"
          />
          <button type="submit">Console out!</button>
        </form>
      </div>
    );
  }

}
