// @flow
import { SET_VALUE } from '../actionTypes';

export type TSetValueAction = {
  +type: typeof SET_VALUE;
  +payload: {
    +formName: string;
    +fieldKey: string;
    +value: any;
  };
};

export const setValue = (
  formName: string,
  fieldKey: string,
  value: any,
): TSetValueAction => ({
  type: SET_VALUE,
  payload: {
    formName,
    fieldKey,
    value,
  },
});
