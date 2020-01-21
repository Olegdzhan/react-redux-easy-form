// @flow

import { createSelector } from 'reselect';
import selectForm from '/selectForm';
import type { TFormState } from '../reducer';
import type { TEasyFormHocStatusesField } from '../decorator/TEasyFormHocProps';

export default (formName: string) => createSelector(
    selectForm(formName),
    (form: TFormState): TEasyFormHocStatusesField => form.statuses || {},
);
