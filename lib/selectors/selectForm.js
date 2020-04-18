// @flow

import { createSelector } from 'reselect';
import type { TFormsBranchState } from '../types/TFormsBranchState';
import type { TFormState } from '../types/TFormState';
import rootFormsSelector from './rootFormsSelector';

const defaultForm: TFormState = {};

export default (formName: string) => createSelector(
  rootFormsSelector,
  (forms: TFormsBranchState): TFormState => forms[formName] || defaultForm,
);
