// @flow

import { createSelector } from 'reselect';
import selectForm from '/selectForm';
import type { TFormState } from '../reducer';
import type { TEasyFormHocErrorsField } from '../decorator/TEasyFormHocProps';

export default (formName: string) => createSelector(
    selectForm(formName),
    (form: TFormState): TEasyFormHocErrorsField => form.fieldErrors || {},
);
