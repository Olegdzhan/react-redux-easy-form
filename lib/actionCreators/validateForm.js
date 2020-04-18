// @flow

import { VALIDATE_FORM } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TValidateFormActionPayload = {
  formName: string;
  errorsArray: ?string[];
};

export const validateForm = (
  formName: string,
  errors: ?string[],
): TAction<TValidateFormActionPayload> => ({
  type: VALIDATE_FORM,
  payload: {
    formName,
    errors,
  },
});
