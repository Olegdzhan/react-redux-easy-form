// @flow

import { VALIDATE_FIELD } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TValidateFieldActionPayload = {
  formName: string;
  fieldKey: string;
  errorMessage: string;
};

export const validateField = (
  formName: string,
  fieldKey: string,
  errorMessage: string,
): TAction<TValidateFieldActionPayload> => ({
  type: VALIDATE_FIELD,
  payload: {
    formName,
    fieldKey,
    errorMessage,
  },
});
