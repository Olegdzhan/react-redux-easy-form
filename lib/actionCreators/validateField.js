// @flow
import { VALIDATE_FIELD } from '../actionTypes';

export type TValidateFieldAction = {
  +type: typeof VALIDATE_FIELD;
  +payload: {
    +formName: string;
    +fieldKey: string;
    +errorMessage: string;
  };
};

export const validateField = (
  formName: string,
  fieldKey: string,
  errorMessage: string,
): TValidateFieldAction => ({
  type: VALIDATE_FIELD,
  payload: {
    formName,
    fieldKey,
    errorMessage,
  },
});
