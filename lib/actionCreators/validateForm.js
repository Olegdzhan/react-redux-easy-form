// @flow
import { VALIDATE_FORM } from '../actionTypes';

export type TValidateFormAction = {
  +type: typeof VALIDATE_FORM;
  +payload: {
    +formName: string;
    +errorsArray: ?string[];
  };
};

export const validateForm = (
  formName: string,
  errorsArray: ?string[],
): TValidateFormAction => ({
  type: VALIDATE_FORM,
  payload: {
    formName,
    errorsArray,
  },
});
