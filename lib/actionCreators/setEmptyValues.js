// @flow
import { SET_EMPTY_VALUES } from '../actionTypes';
import type { TEasyFormFieldConfig } from '../types/TEasyFormFieldConfig';

export type TSetEmptyValuesAction = {
  +type: typeof SET_EMPTY_VALUES;
  +payload: {
    +formName: string;
    +fieldsConfig: { [k: string]: TEasyFormFieldConfig };
  };
};

export const setEmptyValues = (
  formName: string,
  fieldsConfig: { [k: string]: TEasyFormFieldConfig },
): TSetEmptyValuesAction => ({
  type: SET_EMPTY_VALUES,
  payload: {
    formName,
    fieldsConfig,
  },
});
