// @flow

import { createSelector } from 'reselect';
import selectForm from './selectForm';
import type { TFormState } from '../types/TFormState';
import type { TEasyFormHocFormErrors } from '../types/TEasyFormHocFormErrors';

export default (formName: string) => createSelector(
  selectForm(formName),
  (form: TFormState): TEasyFormHocFormErrors => form.formErrors,
);
