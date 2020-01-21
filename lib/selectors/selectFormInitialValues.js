// @flow

import { createSelector } from 'reselect';
import selectForm from '/selectForm';
import type { TFormState } from '../reducer';
import type { TEasyFormHocValuesField } from '../decorator/TEasyFormHocProps';

export default (formName: string) => createSelector(
    selectForm(formName),
    (form: TFormState): TEasyFormHocValuesField => form.initialValues || {},
);
