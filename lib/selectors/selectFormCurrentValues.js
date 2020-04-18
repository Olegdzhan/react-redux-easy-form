// @flow

import { createSelector } from 'reselect';
import selectForm from './selectForm';
import type { TFormState } from '../types/TFormState';
import type { TEasyFormHocValuesField } from '../types/TEasyFormHocValuesField';

const defaultCurrentValues: TEasyFormHocValuesField = {};

export default (formName: string) => createSelector(
  selectForm(formName),
  (form: TFormState): TEasyFormHocValuesField => form.currentValues || defaultCurrentValues,
);
