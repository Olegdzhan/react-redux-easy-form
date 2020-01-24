// @flow

import { CLEAR_FIELD_ERROR } from '../actionTypes';
import type { TAction } from '../types/TAction';

export type TClearFieldErrorActionPayload = {
  formName: string;
  fieldKey: string;
};

export const clearFieldError = (
  formName: string,
  fieldKey: string,
): TAction<TClearFieldErrorActionPayload> => ({
  type: CLEAR_FIELD_ERROR,
  payload: {
    formName,
    fieldKey,
  },
});
