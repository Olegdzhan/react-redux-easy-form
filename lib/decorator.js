import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import pt from 'prop-types';

import * as actions from './actionCreators';

export default ({ formName, fields, formValidator }) => ReactComponent => {

  class EasyFormHOC extends PureComponent {
    static propTypes = {
      form: pt.exact({
        initialValues: pt.shape(),
        currentValues: pt.shape(),
        fieldErrors: pt.shape(),
        formErrors: pt.arrayOf(pt.string)
      }),
      setValue: pt.func,
      setInitialValues: pt.func,
      validateField: pt.func,
      validateForm: pt.func,
      dropForm: pt.func
    };

    changers = {};
    initialValues = {};
    getters = {};

    constructor(props) {
      super(props);

      for (const key in fields) {
        const {
          initialValue,
          type,
          validator,
          errorMessage
        } = fields[key];
        this.getters[key] = this.getValue(key);
        this.changers[key] = this.valueChanger(key);
        this.initialValues[key] = typeof initialValue === 'function' ? initialValue(props) : initialValue || null;
        this.initialValues[key] === null && console.warn(`react-redux-easy-form: Set initial value for field with key '${key}' in form ${formName}.`);
        validator && !errorMessage && console.warn(`react-redux-easy-form: Set errorMessage for field with key '${key}' in form ${formName}.`);
        !type && console.error(`react-redux-easy-form: Type for field with key '${key}' in form ${formName} must be set.`);
      }
    }

    componentDidMount() {
      this.props.setInitialValues(formName, this.initialValues);
    }

    getValue = key => () => {
      const {
        form: {
          currentValues,
          initialValues
        }
      } = this.props;
      const { type } = fields[key];
      let defaultValue;
      switch (type) {
        case 'string': defaultValue = ''; break;
        case 'number': defaultValue = 0; break;
        case 'array': defaultValue = []; break;
        case 'object': defaultValue = {}; break;
      }
      return currentValues[key] || initialValues[key] || defaultValue;
    };

    valueChanger = fieldKey => event => {
      const theField = fields[fieldKey];
      const onChange = typeof theField.onChange === 'function'
        ? theField.onChange
        : event => event.target.value;
      const value = onChange(event);
      const {
        validateField,
        setValue
      } = this.props;
      validateField(
        formName,
        fieldKey,
        theField.validateOnChange && typeof theField.validator === 'function' && !theField.validator(value) ? theField.errorMessage : null
      );
      setValue(formName, fieldKey, value);
    };

    preValidate = () => {
      const {
        form: {
          initialValues,
          currentValues
        },
        validateField,
        validateForm
      } = this.props;
      for (const key in fields) {
        const theField = fields[key];
        validateField(
          formName,
          key,
          typeof theField.validator === 'function' && !theField.validator(this.getters[key]()) ? theField.errorMessage : null
        );
      }
      if (typeof formValidator === 'function') {
        const errArr = formValidator({ ...initialValues, ...currentValues });
        validateForm(
          formName,
          Array.isArray(errArr) && errArr.length > 0 ? errArr : []
        );
      }
    };

    postValidate = () => {
      const {
        forms: {
          fieldErrors,
          formErrors
        }
      } = this.props;
      let fieldsHaveErrors = false;
      for (const key in fieldErrors) {
        fieldsHaveErrors = fieldsHaveErrors || fieldErrors[key];
      }
      return !fieldsHaveErrors && formErrors.length === 0;
    };

    validate = () => {
      this.preValidate();
      return this.postValidate();
    };

    createProps() {
      return {
        ...this.props,
        setters: this.changers,
        getters: this.getters,
        validateAll: this.validate
      };
    }

    render() {
      return (
        <ReactComponent {...this.createProps()} />
      );
    }

  }

  const mapStateToProps = ({ forms }) => ({
    form: forms[formName]
  });

  const mapDispatchToProps = {
    ...actions
  };

  return connect(mapStateToProps, mapDispatchToProps)(EasyFormHOC);

}