// @flow

import type { TEasyFormFieldConfig } from '../TEasyFormConfig';

export type TSetMethodsOverFieldsConfig = {
    changeValueClosure: (fieldKey: string) => (event: Object) => void;
    clearFieldClosure: (fieldKey: string) => () => void;
    clearErrorClosure: (fieldKey: string) => () => void;
    getValidatorClosure: (fieldKey: string) => () => void;
    setInitialValue: (fieldKey: string) => any;
};

export interface ISetMethodsOverFieldsResult {
    changers: { [fieldKey: string]: (event: Object) => void };
    clears: { [fieldKey: string]: () => void };
    clearError: { [fieldKey: string]: () => void };
    initialValues: { [fieldKey: string]: any };
    validators: { [fieldKey: string]: () => void };
}

export default (
    fields: { [k: string]: TEasyFormFieldConfig },
    config: TSetMethodsOverFieldsConfig,
): ISetMethodsOverFieldsResult => {
    const result: ISetMethodsOverFieldsResult = {
        changers: {},
        clears: {},
        clearError: {},
        initialValues: {},
        validators: {},
    };
    Object.keys(fields).forEach((fieldKey: string): void => {
        result.changers[fieldKey] = config.changeValueClosure(fieldKey);
        result.clears[fieldKey] = config.clearFieldClosure(fieldKey);
        result.clearError[fieldKey] = config.clearErrorClosure(fieldKey);
        result.initialValues[fieldKey] = config.setInitialValue(fieldKey);
        result.validators[fieldKey] = config.getValidatorClosure(fieldKey);
    });
    return result;
};
