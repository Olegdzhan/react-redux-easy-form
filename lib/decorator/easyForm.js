// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actionCreators';
import type { TEasyFormConfig } from './TEasyFormConfig';
import type { TEasyFormHocProps } from './TEasyFormHocProps';
import setMethodsOverFields, { ISetMethodsOverFieldsResult } from './helpers/setMethodsOverFields';

export default ({
    formName,
    fields,
    formValidator,
    getFormsFrom
}: TEasyFormConfig): Function => (ReactComponent: Function): PureComponent => {
    class EasyFormHOC extends PureComponent<TEasyFormHocProps> implements ISetMethodsOverFieldsResult {
        changers: { [fieldKey: string]: (event: Object) => void };

        clears: { [fieldKey: string]: () => void };

        clearError: { [fieldKey: string]: () => void };

        getters: { [fieldKey: string]: () => any };

        initialValues: { [fieldKey: string]: any };

        validators: { [fieldKey: string]: () => void };

        constructor(props) {
            super(props);
            const result = setMethodsOverFields({
                componentProps: props,
                changeValueClosure: this.valueChanger,
                clearFieldClosure: this.clearValue,
                clearErrorClosure: this.callClearError,
                getValueClosure: this.getValue,
                getValidatorClosure: this.validateByKey,
                setInitialValue: this.setInitialValue,
            });
            this.setHelpers(result);
            // for (const key in fields) {
            //     const {
            //         initialValue,
            //         type
            //     } = fields[key];
            //     this.getters[key] = this.getValue(key);
            //     this.changers[key] = this.valueChanger(key);
            //     this.validators[key] = this.validateByKey(key);
            //     this.clears[key] = this.clearValue(key);
            //     this.clearError[key] = this.callClearError(key);
            //     this.initialValues[key] = typeof initialValue === 'function' ? initialValue(props) : initialValue || null;
            //     this.initialValues[key] === null && console.warn(`react-redux-easy-form: Set initial value for field with key '${key}' in form ${formName}.`);
            //     !type && console.error(`react-redux-easy-form: Type for field with key '${key}' in form ${formName} must be set.`);
            // }
        }

        componentDidMount() {
            this.props.formActions.setInitialValues(this.initialValues);
        }

        setHelpers(methodsOverFieldsResult: ISetMethodsOverFieldsResult): void {
            Object.keys(methodsOverFieldsResult).forEach((key: string): void => {
                this[key] = methodsOverFieldsResult[key];
            });
        }

        setInitialValue = (fieldKey: string) => {
            const theField = fields[fieldKey];
            if (theField.type) {
                console.warn('@easy-form: the field property "type" has been deprecated since v.1.0.0 and takes no effect in calculations');
            }
            const { initialValue } = theField;
            if (typeof initialValue === 'function') {
                return initialValue(this.props);
            }
            return initialValue;
        };

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
            if (typeof theField.validator === 'function' && theField.validateOnChange) {
                validateField(formName, fieldKey, theField.validator(value));
            }
        };

        validateByKey = fieldKey => () => {
            const theField = fields[fieldKey];
            typeof theField.validator === 'function' && this.props.validateField(
                formName,
                fieldKey,
                theField.validator(this.getters[fieldKey]())
            );
        };

        clearValue = (fieldKey: string): Function => (): void => {
            const { setValue, makeDirty } = this.props.formActions;
            makeDirty(fieldKey);
            setValue(fieldKey, null);
        };

        validate = ({ exclude } = {}) => {
            const {
                form: {
                    initialValues,
                    currentValues,
                    statuses
                },
                validateField,
                validateForm,
            } = this.props;
            let result = true;
            const filteredFields = { ...fields };
            exclude && exclude.length && exclude.forEach(fieldKey => {
                delete filteredFields[fieldKey];
            });
            for (const key in filteredFields) {
                const theField = filteredFields[key];
                const theValue = statuses[key] === 'pristine' ? initialValues[key] : currentValues[key];
                if (typeof theField.validator === 'function') {
                    const validation = theField.validator(theValue);
                    validateField(formName, key, validation);
                    if (validation !== null && validation !== undefined) {
                        result = false;
                    }
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

        clearFormErrors = () => {
            this.props.clearFormErrors(formName);
        };

        callClearError = fieldKey => () => {
            this.props.clearFieldError(formName, fieldKey);
        };

        createProps() {
            return {
                ...this.props,
                setters: this.changers,
                getters: this.getters,
                validators: this.validators,
                removers: this.clears,
                validateAll: this.validate,
                clearError: this.clearError,
                clearFormErrors: this.clearFormErrors,
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

    const mapDispatchToProps = (dispatch: Function): { formActions: { [k: string]: Function } } => {
        const mappedDispatchers: { [k: string]: Function } = {};
        Object.keys(actions).forEach((key: string): void => {
            mappedDispatchers[key] = (...args) => dispatch(action[key](formName, ...args));
        });
        return { formActions: mappedDispatchers };
    };

    return connect(mapStateToProps, mapDispatchToProps)(EasyFormHOC);
}