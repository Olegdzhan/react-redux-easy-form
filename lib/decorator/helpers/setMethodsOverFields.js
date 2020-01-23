// @flow

import type { TEasyFormFieldConfig } from '../../types/TEasyFormConfig';
import type { TSetMethodsOverFieldsConfig } from '../../types/private/TSetMethodsOverFieldsConfig';
import { ISetMethodsOverFieldsResult } from '../../types/private/ISetMethodsOverFieldsResult';

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
