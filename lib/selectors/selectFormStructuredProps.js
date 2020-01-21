// @flow

import { createStructuredSelector } from 'reselect';
import selectFormInitialValues from './selectFormInitialValues';
import selectFormValues from './selectFormValues';
import selectFormStatuses from './selectFormStatuses';
import selectFormFieldErrors from './selectFormFieldErrors';
import selectFormErrors from './selectFormErrors';

export default (formName: string) => createStructuredSelector({
    initialValues: selectFormInitialValues(formName),
    values: selectFormValues(formName),
    statuses: selectFormStatuses(formName),
    fieldErrors: selectFormFieldErrors(formName),
    formErrors: selectFormErrors(formName),
});
