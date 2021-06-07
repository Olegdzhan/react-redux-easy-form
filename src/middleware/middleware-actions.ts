import { EEasyFormLogicActionType } from './middleware-enums';

export const changeValue = (
  formName: string,
  fieldName: string,
  value: any,
) => ({
  type: EEasyFormLogicActionType.ChangeValue,
  payload: { formName, fieldName, value },
} as const);

export const clearValue = (
  formName: string,
  fieldName: string,
) => ({
  type: EEasyFormLogicActionType.ClearValue,
  payload: { formName, fieldName },
} as const);

export const changeValueAndValidate = (
  formName: string,
  fieldName: string,
  value: any,
) => ({
  type: EEasyFormLogicActionType.ChangeValueAndValidate,
  payload: { formName, fieldName, value },
} as const);

export const validateField = (
  formName: string,
  fieldName: string,
) => ({
  type: EEasyFormLogicActionType.ValidateField,
  payload: { formName, fieldName },
} as const);

export const validateAll = (formName: string) => ({
  type: EEasyFormLogicActionType.ValidateAll,
  payload: { formName },
} as const);
