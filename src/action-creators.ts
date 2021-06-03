import { EEasyFormActionType, EEasyFormFieldStatus } from './enums';
import { TPseudoAnyEnum } from './types';

export const setFieldValue = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
  value: any,
) => ({
  type: EEasyFormActionType.SetFieldValue,
  payload: { formName, fieldName, value },
} as const);

export const clearFieldValue = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => ({
  type: EEasyFormActionType.ClearFieldValue,
  payload: { formName, fieldName },
} as const);

export const setFieldErrors = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
  errors: string[] | null | undefined,
) => ({
  type: EEasyFormActionType.SetFieldErrors,
  payload: { formName, fieldName, errors },
} as const);

export const clearFieldErrors = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => ({
  type: EEasyFormActionType.ClearFieldErrors,
  payload: { formName, fieldName },
} as const);

export const setFieldStatus = (
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
  status: EEasyFormFieldStatus,
) => ({
  type: EEasyFormActionType.SetFieldStatus,
  payload: { formName, fieldName, status },
} as const);

export const initiateForm = <T extends { [P in TPseudoAnyEnum]: any }>(
  formName: TPseudoAnyEnum,
  initialValues: T,
) => ({
  type: EEasyFormActionType.InitiateForm,
  payload: { formName, initialValues },
} as const);

export const setFormErrors = (
  formName: TPseudoAnyEnum,
  errors: string[] | null | undefined,
) => ({
  type: EEasyFormActionType.SetFormErrors,
  payload: { formName, errors },
} as const);

export const dropForm = (formName: TPseudoAnyEnum) => ({
  type: EEasyFormActionType.DropForm,
  payload: { formName },
} as const);

export type TActionCreators =
  ReturnType<typeof setFieldValue> |
  ReturnType<typeof clearFieldValue> |
  ReturnType<typeof clearFieldErrors> |
  ReturnType<typeof setFieldErrors> |
  ReturnType<typeof setFieldStatus> |
  ReturnType<typeof initiateForm> |
  ReturnType<typeof setFormErrors> |
  ReturnType<typeof dropForm>;
