// @flow

import type { TEasyFormHocValuesField } from './TEasyFormHocValuesField';
import type { TEasyFormHocStatusesField } from './TEasyFormHocStatusesField';
import type { TEasyFormHocErrorsField } from './TEasyFormHocErrorsField';
import type { TEasyFormHocFormErrors } from './TEasyFormHocFormErrors';

export type TFormStructuredProps = {
    values: TEasyFormHocValuesField;
    initialValues: TEasyFormHocValuesField;
    fieldErrors: TEasyFormHocErrorsField;
    formErrors: TEasyFormHocFormErrors;
    statuses: TEasyFormHocStatusesField;
};