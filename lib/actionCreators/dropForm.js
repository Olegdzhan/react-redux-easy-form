// @flow
import { DROP_FORM } from '../actionTypes';

export type TDropFormAction = {
  +type: typeof DROP_FORM;
  +payload: {
    +formName: string;
    +restoreInitials: boolean;
  };
};

export const dropForm = (
  formName: string,
  restoreInitials: boolean = false,
): TDropFormAction => ({
  type: DROP_FORM,
  payload: {
    formName,
    restoreInitials,
  },
});
