// @flow
import { SET_EMPTY_VALUES } from '../actionTypes';
import type { TAction } from '../types/TAction';
import type { TEasyFormFieldConfig } from '../types/TEasyFormFieldConfig';

export type TSetEmptyValuesActionPayload = {
  formName: string;
  fieldsConfig: { [k: string]: TEasyFormFieldConfig };
};

export const setEmptyValues = (
  formName: string,
  fieldsConfig: { [k: string]: TEasyFormFieldConfig },
): TAction<TSetEmptyValuesActionPayload> => ({
  type: SET_EMPTY_VALUES,
  payload: {
    formName,
    fieldsConfig,
  },
});
