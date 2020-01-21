// @flow

import { createSelector } from 'reselect';
import selectForm from '/selectForm';
import type { TFormState } from '../reducer';

export default (formName: string) => createSelector(
    selectForm(formName),
    (form: TFormState): string[] | null => form.formErrors,
);
