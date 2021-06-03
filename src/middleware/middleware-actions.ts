import { TPseudoAnyEnum, TValidator } from '../types';
import { EEasyFormLogicActionType } from './middleware-enums';

export const changeValue = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
  value: any,
) => ({
  type: EEasyFormLogicActionType.ChangeValue,
  payload: { formName, fieldName, value },
} as const);

export const clearValue = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => ({
  type: EEasyFormLogicActionType.ClearValue,
  payload: { formName, fieldName },
} as const);

export const changeValueAndValidate = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
  value: any,
) => ({
  type: EEasyFormLogicActionType.ChangeValueAndValidate,
  payload: { formName, fieldName, value },
} as const);

export const validateField = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => ({
  type: EEasyFormLogicActionType.ValidateField,
  payload: { formName, fieldName },
} as const);

export const validateAll = (formName: TPseudoAnyEnum) => ({
  type: EEasyFormLogicActionType.ValidateAll,
  payload: { formName },
} as const);
