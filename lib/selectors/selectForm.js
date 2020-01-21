// @flow

import { createSelector } from 'reselect';
import rootFormsSelector from './rootFormsSelector';
import type { TFormState, TFormsBranchState } from "../reducer";

export default (formName: string) => createSelector(
    rootFormsSelector,
    (forms: TFormsBranchState): TFormState => forms[formName] || {},
);
