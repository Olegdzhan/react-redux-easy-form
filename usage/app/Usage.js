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
      validator: val => {
        if (val) {
          const trimmed = val.trim();
          if (trimmed) {
            return /^[-\sA-Za-zА-Яа-я]+$/.test(trimmed) ? null : 'First name must be in letters.';
          }
          return 'First name must be set.';
        }
        return 'First name must be set.';
      },
      validateOnChange: true
    },
    'secondName': {
      initialValue: '',
      type: 'string',
      validator: val => {
        if (val && val.trim()) {
          return null;
        }
        return 'Second name is required';
      }
    },
    'middleName': {
      initialValue: '',
      type: 'string',
      errorMessage: 'Middle name is required',
      validator: val => val.length > 0,
    },
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
        secondName: pt.string,
        middleName: pt.string,
      }),
      formErrors: pt.arrayOf(pt.string)
    }),
    getters: pt.exact({
      firstName: pt.func,
      secondName: pt.func,
      middleName: pt.func
    }),
    setters: pt.exact({
      firstName: pt.func,
      secondName: pt.func,
      middleName: pt.func
    }),
    validators: pt.exact({
      firstName: pt.func,
      secondName: pt.func,
      middleName: pt.func
    }),
    removers: pt.exact({
      firstName: pt.func,
      secondName: pt.func,
      middleName: pt.func
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
        secondName,
        middleName
      },
      dropForm,
      validateAll
    } = this.props;
    if (validateAll({ exclude: ['middleName'] })) {
      console.log({
        firstName: firstName(),
        secondName: secondName(),
        middleName: middleName()
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
            <button type="button" onClick={removers.firstName}>Clear</button>
            <span style={{ color: 'red' }}>{fieldErrors.firstName}</span>
          </div>
          <div>
            <input
              type="text"
              value={getters.secondName()}
              onChange={setters.secondName}
              onBlur={validators.secondName}
              placeholder="Second Name"
            />
            <button type="button" onClick={removers.secondName}>Clear</button>
            <span style={{ color: 'red' }}>{fieldErrors.secondName}</span>
          </div>
          <div>
            <input
              type="text"
              value={getters.middleName()}
              onChange={setters.middleName}
              placeholder="Middle Name"
            />
            <span style={{ color: 'red' }}>{fieldErrors.middleName}</span>
          </div>
          <button type="submit">Console out!</button>
        </form>
        <h3 style={{ color: 'red' }}>{formErrors.join('. ')}</h3>
      </div>
    );
  }

}
