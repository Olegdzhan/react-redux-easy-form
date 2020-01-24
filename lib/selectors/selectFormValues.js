// @flow

import { createSelector } from 'reselect';
import selectForm from './selectForm';
import type { TFormState } from '../types/TFormState';
import type { TEasyFormHocValuesField } from '../types/TEasyFormHocValuesField';

export default (formName: string) => createSelector(
  selectForm(formName),
  ({
    statuses = {},
    currentValues = {},
    initialValues = {},
  }: TFormState): TEasyFormHocValuesField => {
    const values = {};
    Object.keys(initialValues).forEach((fieldKey: string): void => {
      if (statuses[fieldKey] === 'pristine') {
        values[fieldKey] = currentValues[fieldKey] || initialValues[fieldKey];
      } else if (statuses[fieldKey] === 'dirty') {
        values[fieldKey] = currentValues[fieldKey];
      }
    });
    return values;
  },
);
