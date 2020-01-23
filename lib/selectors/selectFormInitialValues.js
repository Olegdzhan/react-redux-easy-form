// @flow

import { createSelector } from 'reselect';
import selectForm from '/selectForm';
import type { TFormState } from '../types/TFormState';
import type { TEasyFormHocValuesField } from '../types/TEasyFormHocValuesField';

export default (formName: string) => createSelector(
    selectForm(formName),
    (form: TFormState): TEasyFormHocValuesField => form.initialValues || {},
);
