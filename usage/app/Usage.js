// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { easyForm, type TEasyFormHocProps } from '../../lib';
import formConfig from './formConfig';
import type { TUsageProps } from './TUsageProps';

type TProps = TEasyFormHocProps & TUsageProps;

const stubFn = () => {};
const stubMap = {};

const easyFormHocDefaultProps: TEasyFormHocProps = {
  form: {
    values: stubMap,
    initialValues: stubMap,
    statuses: stubMap,
    fieldErrors: stubMap,
    formErrors: null,
  },
  formActions: {
    setValue: stubFn,
    setInitialValues: stubFn,
    setEmptyValues: stubFn,
    validateField: stubFn,
    validateForm: stubFn,
    dropForm: stubFn,
    makeDirty: stubFn,
    makePristine: stubFn,
    clearFieldError: stubFn,
    clearFormErrors: stubFn,
  },
  setters: stubMap,
  removers: stubMap,
  validators: stubMap,
  clearError: stubMap,
  validateAll: () => true,
};

@connect(({ response }) => ({ response }))
@easyForm(formConfig)
export default class Usage extends PureComponent<TProps> {
  static defaultProps = {
    ...easyFormHocDefaultProps,
    response: { firstName: '' },
  };

  onSubmit = (event: Object): void => {
    event.preventDefault();
    const {
      form: {
        values,
      },
      formActions: {
        dropForm,
      },
      validateAll,
    } = this.props;
    if (validateAll({ exclude: ['lastName'] })) {
      console.log(values);
      dropForm(true);
    }
  };

  render() {
    const {
      form: {
        fieldErrors,
        formErrors,
        values,
      },
      formActions: {
        clearFormErrors,
      },
      clearError,
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
              value={values.firstName}
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
              value={values.lastName}
              onChange={setters.lastName}
              onBlur={validators.lastName}
              placeholder="Second Name"
            />
            <button type="button" onClick={removers.lastName}>Clear</button>
            <span style={{ color: 'red' }}>{fieldErrors.lastName}</span>
          </div>
          <button type="submit">Console out!</button>
          <button type="button" onClick={clearFormErrors}>Clear form errors</button>
          <button type="button" onClick={clearError.firstName}>Clear first name error</button>
        </form>
        {formErrors && (
          <h3 style={{ color: 'red' }}>{formErrors.join('. ')}</h3>
        )}
      </div>
    );
  }
}
