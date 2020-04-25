// @flow
import { SET_INITIAL_VALUES } from '../actionTypes';

export type TSetInitialValuesAction = {
  +type: typeof SET_INITIAL_VALUES;
  +payload: {
    +formName: string;
    +initialValues: { [k: string]: any };
  };
};

export const setInitialValues = (
  formName: string,
  initialValues: { [k: string]: any },
): TSetInitialValuesAction => ({
  type: SET_INITIAL_VALUES,
  payload: {
    formName,
    initialValues,
  },
});
