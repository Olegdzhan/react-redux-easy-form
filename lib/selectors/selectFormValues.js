// @flow
import { createSelector } from 'reselect';
import selectFormStatuses from './selectFormStatuses';
import selectFormInitialValues from './selectFormInitialValues';
import selectFormCurrentValues from './selectFormCurrentValues';
import type { TEasyFormHocStatusesField } from '../types/TEasyFormHocStatusesField';
import type { TEasyFormHocValuesField } from '../types/TEasyFormHocValuesField';
import { FieldStatus } from '../constants';

export default (formName: string) => createSelector(
  selectFormStatuses(formName),
  selectFormInitialValues(formName),
  selectFormCurrentValues(formName),
  (
    statuses: TEasyFormHocStatusesField,
    initialValues: TEasyFormHocValuesField,
    currentValues: TEasyFormHocValuesField,
  ): TEasyFormHocValuesField => {
    const values: TEasyFormHocValuesField = {};
    Object.keys(initialValues).forEach((fieldKey: string): void => {
      if (statuses[fieldKey] === FieldStatus.Pristine) {
        values[fieldKey] = currentValues[fieldKey] || initialValues[fieldKey];
      } else if (statuses[fieldKey] === FieldStatus.Dirty) {
        values[fieldKey] = currentValues[fieldKey];
      }
    });
    return values;
  },
);
