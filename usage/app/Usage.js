import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import pt from 'prop-types';
import { easyForm } from 'lib';
import { Forms } from './constants';

const formConfig = {
  formName: Forms.TEST_FORM_1,
  getFormsFrom: state => state.myForms,
  fields: {
    'firstName': {
      initialValue: ({ response }) => response.firstName,
      type: 'string',
      validateOnChange: false,
      errorMessage: 'First name must have more than 5 letters',
      validator: val => val && val.trim() && val.length > 5
    },
    'secondName': {
      initialValue: 'secondName',
      type: 'string',
      validateOnChange: false,
      errorMessage: 'Second name is required',
      validator: val => val && val.trim()
    }
  },
  formValidator: ({ firstName, secondName }) => {
    if (firstName && secondName && firstName === secondName) {
      return ['First name must not be equal to Second name'];
    }
    return [];
  }
};

@connect(({ response }) => ({ response }))
@easyForm(formConfig)
export default class Usage extends PureComponent {
  static propTypes = {
    form: pt.shape({
      initialValues: pt.shape(),
      currentValues: pt.shape(),
      fieldErrors: pt.exact({
        firstName: pt.string,
        secondName: pt.string
      }),
      formErrors: pt.arrayOf(pt.string)
    }),
    getters: pt.exact({
      firstName: pt.func,
      secondName: pt.func
    }),
    setters: pt.exact({
      firstName: pt.func,
      secondName: pt.func
    }),
    validators: pt.exact({
      firstName: pt.func,
      secondName: pt.func,
    }),
    removers: pt.exact({
      firstName: pt.func,
      secondName: pt.func,
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
      form: {
        fieldErrors,
        formErrors
      },
      getters,
      setters,
      validators,
      removers,
    } = this.props;
    return (
      <div>
        <h1>React Redux Easy Form</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <input
              type="text"
              value={getters.firstName()}
              onChange={setters.firstName}
              onBlur={validators.firstName}
              placeholder="First Name"
            />
            <span style={{ color: 'red' }}>{fieldErrors.firstName}</span>
            <button type="button" onClick={removers.firstName}>Clear</button>
          </div>
          <div>
            <input
              type="text"
              value={getters.secondName()}
              onChange={setters.secondName}
              onBlur={validators.firstName}
              placeholder="Second Name"
            />
            <span style={{ color: 'red' }}>{fieldErrors.secondName}</span>
          </div>
          <button type="submit">Console out!</button>
        </form>
        <h3 style={{ color: 'red' }}>{formErrors.join('. ')}</h3>
      </div>
    );
  }

}
