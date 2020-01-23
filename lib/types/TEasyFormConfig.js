// @flow

import type { TEasyFormFieldConfig } from './TEasyFormFieldConfig';
import type { TEasyFormHocValuesField } from './TEasyFormHocValuesField';
import type { TEasyFormHocFormErrors } from './TEasyFormHocFormErrors';

export type TEasyFormConfig = {
    formName: string;
    fields: { [k: string]: TEasyFormFieldConfig };
    formValidator?: (fieldsValues: TEasyFormHocValuesField) => TEasyFormHocFormErrors;
};
