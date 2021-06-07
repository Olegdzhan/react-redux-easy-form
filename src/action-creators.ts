import { EEasyFormActionType, EEasyFormFieldStatus } from './enums';
import { TShape } from './types';

export const setFieldValue = (
  formName: string,
  fieldName: string,
  value: any,
) => ({
  type: EEasyFormActionType.SetFieldValue,
  payload: { formName, fieldName, value },
} as const);

export const clearFieldValue = (
  formName: string,
  fieldName: string,
) => ({
  type: EEasyFormActionType.ClearFieldValue,
  payload: { formName, fieldName },
} as const);

export const setFieldErrors = (
  formName: string,
  fieldName: string,
  errors: string[] | null | undefined,
) => ({
  type: EEasyFormActionType.SetFieldErrors,
  payload: { formName, fieldName, errors },
} as const);

export const clearFieldErrors = (
  formName: string,
  fieldName: string,
) => ({
  type: EEasyFormActionType.ClearFieldErrors,
  payload: { formName, fieldName },
} as const);

export const setFieldStatus = (
  formName: string,
  fieldName: string,
  status: EEasyFormFieldStatus,
) => ({
  type: EEasyFormActionType.SetFieldStatus,
  payload: { formName, fieldName, status },
} as const);

export const initiateForm = <T extends TShape>(
  formName: string,
  initialValues: T,
) => ({
  type: EEasyFormActionType.InitiateForm,
  payload: { formName, initialValues },
} as const);

export const setFormErrors = (
  formName: string,
  errors: string[] | null | undefined,
) => ({
  type: EEasyFormActionType.SetFormErrors,
  payload: { formName, errors },
} as const);

export const dropForm = (formName: string) => ({
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
