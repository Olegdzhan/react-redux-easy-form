// @flow

import type { TEasyFormHocStatusesField } from './TEasyFormHocStatusesField';
import type { TEasyFormHocValuesField } from './TEasyFormHocValuesField';
import type { TEasyFormHocErrorsField } from './TEasyFormHocErrorsField';
import type { TEasyFormHocFormErrors } from './TEasyFormHocFormErrors';

export type TFormState = {
    statuses: TEasyFormHocStatusesField
    initialValues: TEasyFormHocValuesField;
    currentValues:TEasyFormHocValuesField;
    fieldErrors: TEasyFormHocErrorsField;
    formErrors: TEasyFormHocFormErrors;
};
