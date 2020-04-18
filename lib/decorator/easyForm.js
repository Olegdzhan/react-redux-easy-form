// @flow

import React, {
  PureComponent,
  type Node,
  type React$Component,
} from 'react';
import type { SyntheticInputEvent } from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actionCreators';
import type { TDecoratedFormProps } from '../types/TDecoratedFormProps';
import { ISetMethodsOverFieldsResult } from '../types/private/ISetMethodsOverFieldsResult';
import type { TEasyFormHocProps } from '../types/TEasyFormHocProps';
import type { TEasyFormConfig } from '../types/TEasyFormConfig';
import type { TEasyFormFieldConfig } from '../types/TEasyFormFieldConfig';
import type { TEasyFormValidateConfig } from '../types/TEasyFormValidateConfig';
import setMethodsOverFields from './helpers/setMethodsOverFields';
import createChangeValueClosure from './helpers/createChangeValueClosure';
import createClearFieldClosure from './helpers/createClearFieldClosure';
import createClearErrorClosure from './helpers/createClearErrorClosure';
import createSetInitialValue from './helpers/createSetInitialValue';
import createGetValidatorClosure from './helpers/createGetValidatorClosure';
import selectFormStructuredProps from '../selectors/selectFormStructuredProps';

export default (formConfig: TEasyFormConfig) => (ReactComponent: React$Component): React$Component => {
  const {
    formName,
    fields,
    formValidator,
  } = formConfig;

  class EasyFormHOC extends PureComponent<TEasyFormHocProps> implements ISetMethodsOverFieldsResult {
    changers: { [fieldKey: string]: (event: SyntheticInputEvent) => void };

    clears: { [fieldKey: string]: () => void };

    clearError: { [fieldKey: string]: () => void };

    initialValues: { [fieldKey: string]: any };

    validators: { [fieldKey: string]: () => void };

    constructor(props) {
      super(props);
      const result = setMethodsOverFields(fields, {
        changeValueClosure: createChangeValueClosure(formConfig, this.getProps),
        clearFieldClosure: createClearFieldClosure(formConfig, this.getProps),
        clearErrorClosure: createClearErrorClosure(formConfig, this.getProps),
        getValidatorClosure: createGetValidatorClosure(formConfig, this.getProps),
        setInitialValue: createSetInitialValue(formConfig, this.getProps),
      });
      this.setHelpers(result);
    }

    componentDidMount(): void {
      const {
        setEmptyValues,
        setInitialValues,
      } = this.props.formActions;
      setEmptyValues(fields);
      setInitialValues(this.initialValues);
    }

    getProps = (): TEasyFormHocProps => this.props;

    setHelpers(methodsOverFieldsResult: ISetMethodsOverFieldsResult): void {
      Object.keys(methodsOverFieldsResult).forEach((key: string): void => {
        this[key] = methodsOverFieldsResult[key];
      });
    }

    validate = ({ exclude }: TEasyFormValidateConfig = {}): boolean => {
      const {
        form: {
          values,
        },
        formActions: {
          validateField,
          validateForm,
        },
      } = this.props;
      let result = true;
      const filteredFields: TEasyFormFieldConfig = { ...fields };
      if (exclude?.length) {
        exclude.forEach((fieldKey: string): void => {
          delete filteredFields[fieldKey];
        });
      }
      Object.keys(filteredFields).forEach((key: string): void => {
        const theField = filteredFields[key];
        const theValue = values[key];
        if (theField.validator) {
          const validation = theField.validator(theValue);
          validateField(key, validation);
          if (validation != null) {
            result = false;
          }
        }
      });
      if (formValidator) {
        const errArr = formValidator(values);
        if (errArr?.length) {
          validateForm(errArr);
          result = false;
        }
      }
      return result;
    };

    createProps(): TDecoratedFormProps {
      return {
        ...this.props,
        setters: this.changers,
        validators: this.validators,
        removers: this.clears,
        validateAll: this.validate,
        clearError: this.clearError,
      };
    }

    render(): Node {
      return (
        <ReactComponent {...this.createProps()} />
      );
    }
  }

  const mapStateToProps = state => ({
    form: selectFormStructuredProps(formName)(state),
  });

  const mapDispatchToProps = (dispatch: Function): { formActions: { [k: string]: Function } } => {
    const mappedDispatchers: { [k: string]: (...args: any[]) => void } = {};
    Object.keys(actions).forEach((key: string): void => {
      mappedDispatchers[key] = (...args) => dispatch(actions[key](formName, ...args));
    });
    return { formActions: mappedDispatchers };
  };

  return connect(mapStateToProps, mapDispatchToProps)(EasyFormHOC);
};
