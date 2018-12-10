import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import pt from 'prop-types';

import * as actions from './actionCreators';

export default ({
  formName,
  fields,
  formValidator,
  getFormsFrom
}) => ReactComponent => {

  class EasyFormHOC extends PureComponent {
    static propTypes = {
      form: pt.exact({
        statuses: pt.shape(),
        initialValues: pt.shape(),
        currentValues: pt.shape(),
        fieldErrors: pt.shape(),
        formErrors: pt.arrayOf(pt.string)
      }),
      setValue: pt.func,
      setInitialValues: pt.func,
      validateField: pt.func,
      validateForm: pt.func,
      dropForm: pt.func,
      makeDirty: pt.func,
      makePristine: pt.func,
    };

    changers = {};
    initialValues = {};
    getters = {};
    validators = {};
    clears = {};

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
        this.validators[key] = this.validateByKey(key);
        this.clears[key] = this.clearValue(key);
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
          initialValues,
          statuses
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
      return statuses[key] === 'pristine'
        ? currentValues[key] || initialValues[key] || defaultValue
        : currentValues[key] || defaultValue;
    };

    valueChanger = fieldKey => event => {
      const theField = fields[fieldKey];
      const onChange = typeof theField.onChange === 'function'
        ? theField.onChange
        : event => event.target.value;
      const value = onChange(event);
      const {
        form: { statuses },
        validateField,
        setValue,
        makeDirty
      } = this.props;
      setValue(formName, fieldKey, value);
      statuses[fieldKey] === 'pristine' && makeDirty(formName, fieldKey);
      theField.validateOnChange && validateField(
        formName,
        fieldKey,
        typeof theField.validator === 'function' && !theField.validator(value) ? theField.errorMessage : null
      );
    };

    validateByKey = fieldKey => () => {
      const theField = fields[fieldKey];
      typeof theField.validator === 'function' && this.props.validateField(
        formName,
        fieldKey,
        !theField.validator(this.getters[fieldKey]()) ? theField.errorMessage : null
      );
    };

    clearValue = fieldKey => () => {
      const { setValue } = this.props;
      setValue(formName, fieldKey, null);
    };

    validate = ({ exclude } = {}) => {
      const {
        form: {
          initialValues,
          currentValues
        },
        validateField,
        validateForm
      } = this.props;
      let result = true;
      const filteredFields = { ...fields };
      exclude && exclude.length && exclude.forEach(fieldKey => {
        delete filteredFields[fieldKey];
      });
      for (const key in filteredFields) {
        const theField = filteredFields[key];
        if (typeof theField.validator === 'function' && !theField.validator(currentValues[key] || initialValues[key])) {
          validateField(formName, key, theField.errorMessage);
          result = false;
        }
      }
      if (typeof formValidator === 'function') {
        const errArr = formValidator({ ...initialValues, ...currentValues });
        if (Array.isArray(errArr) && errArr.length > 0) {
          validateForm(formName, errArr);
          result = false;
        }
      }
      return result;
    };

    createProps() {
      return {
        ...this.props,
        setters: this.changers,
        getters: this.getters,
        validators: this.validators,
        removers: this.clears,
        validateAll: this.validate
      };
    }

    render() {
      return (
        <ReactComponent {...this.createProps()} />
      );
    }

  }

  const mapStateToProps = state => {
    const forms = typeof getFormsFrom === 'function'
      ? getFormsFrom(state)
      : state.forms;
    return {
      form: forms[formName]
    };
  };

  const mapDispatchToProps = {
    ...actions
  };

  return connect(mapStateToProps, mapDispatchToProps)(EasyFormHOC);

}