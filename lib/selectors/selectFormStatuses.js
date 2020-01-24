// @flow

import { createSelector } from 'reselect';
import selectForm from './selectForm';
import type { TFormState } from '../types/TFormState';
import type { TEasyFormHocStatusesField } from '../types/TEasyFormHocStatusesField';

export default (formName: string) => createSelector(
  selectForm(formName),
  (form: TFormState): TEasyFormHocStatusesField => form.statuses || {},
);
