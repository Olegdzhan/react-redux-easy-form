// @flow

import { createSelector } from 'reselect';
import selectForm from '/selectForm';
import type { TFormState } from '../types/TFormState';
import type { TEasyFormHocErrorsField } from '../types/TEasyFormHocErrorsField';

export default (formName: string) => createSelector(
    selectForm(formName),
    (form: TFormState): TEasyFormHocErrorsField => form.fieldErrors || {},
);
