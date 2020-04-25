// @flow
import { CLEAR_FORM_ERRORS } from '../actionTypes';

export type TClearFormErrorsAction = {
  +type: typeof CLEAR_FORM_ERRORS;
  +payload: {
    +formName: string;
  };
};

export const clearFormErrors = (formName: string): TClearFormErrorsAction => ({
  type: CLEAR_FORM_ERRORS,
  payload: {
    formName,
  },
});
