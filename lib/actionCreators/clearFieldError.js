// @flow
import { CLEAR_FIELD_ERROR } from '../actionTypes';

export type TClearFieldErrorAction = {
  +type: typeof CLEAR_FIELD_ERROR;
  +payload: {
    +formName: string;
    +fieldKey: string;
  };
};

export const clearFieldError = (
  formName: string,
  fieldKey: string,
): TClearFieldErrorAction => ({
  type: CLEAR_FIELD_ERROR,
  payload: {
    formName,
    fieldKey,
  },
});
