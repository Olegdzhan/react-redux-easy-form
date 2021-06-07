import { createSelector } from 'reselect';
import { EEasyFormField, EEasyFormFieldStatus } from './enums';
import {
  TEasyForm,
  TEasyFormErrors,
  TEasyFormFieldErrors,
  TEasyFormStatuses,
  TShape,
} from './types';

export const getForms = <R = any>(state: any): R => state.forms;

export const createGetForm = <R = any>(formName: string) => createSelector(
  getForms,
  (forms: TShape): R | undefined => forms?.[formName],
);

export const createGetCommonFormErrors = (formName: string) => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): string[] | null | undefined => form?.[EEasyFormField.FormErrors],
);

export const createGetFormAllFieldsErrors = (formName: string) => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): TEasyFormFieldErrors | undefined => form?.[EEasyFormField.FieldErrors],
);

export const createGetFormErrors = (
  formName: string,
) => createSelector(
  createGetCommonFormErrors(formName),
  createGetFormAllFieldsErrors(formName),
  (
    formErrors: string[] | null | undefined,
    fieldErrors: TEasyFormFieldErrors | undefined,
  ): TEasyFormErrors | undefined => {
    if (!fieldErrors && !formErrors) {
      return;
    }
    return {
      ...(fieldErrors ?? <TEasyFormFieldErrors>{}),
      [EEasyFormField.FormErrors]: formErrors,
    };
  },
);

export const createGetIsFormValid = (formName: string) => createSelector(
  createGetFormErrors(formName),
  (formErrors: TEasyFormErrors | undefined): boolean => {
    if (!formErrors) {
      return true;
    }
    for (const key in formErrors) {
      if (Array.isArray(formErrors[key])) {
        return false;
      }
    }
    return true;
  },
);

export const createGetFormValues = (formName: string) => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): any => form?.[EEasyFormField.Values],
);

export const createGetFormInitialValues = (
  formName: string,
) => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): any => form?.[EEasyFormField.Initials],
);

export const createGetFormStatuses = (formName: string) => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): TEasyFormStatuses | undefined => form?.[EEasyFormField.Statuses],
);

export const createGetIsFormPristine = (formName: string) => createSelector(
  createGetFormStatuses(formName),
  (formStatuses: TEasyFormStatuses | undefined): boolean => {
    if (!formStatuses) {
      return true;
    }
    for (const key in formStatuses) {
      if (formStatuses[key] === EEasyFormFieldStatus.Dirty) {
        return false;
      }
    }
    return true;
  },
);

export const createGetFormFieldValue = (
  formName: string,
  fieldName: string,
) => createSelector(
  createGetFormValues(formName),
  (formValues: TShape | undefined): any => formValues?.[fieldName],
);

export const createGetFormFieldInitialValue = (
  formName: string,
  fieldName: string,
) => createSelector(
  createGetFormInitialValues(formName),
  (formInitialValues: TShape | undefined): any => formInitialValues?.[fieldName],
);

export const createGetFormFieldErrors = (
  formName: string,
  fieldName: string,
) => createSelector(
  createGetFormAllFieldsErrors(formName),
  (allFormFieldsErrors: TEasyFormFieldErrors | undefined): string[] | null | undefined => (
    allFormFieldsErrors?.[fieldName]
  ),
);

export const createGetIsFormFieldValid = (
  formName: string,
  fieldName: string,
) => createSelector(
  createGetFormFieldErrors(formName, fieldName),
  (formFieldErrors: string[] | null | undefined): boolean => !formFieldErrors,
);

export const createGetFormFieldStatus = (
  formName: string,
  fieldName: string,
) => createSelector(
  createGetFormStatuses(formName),
  (formStatuses: TEasyFormStatuses | undefined): EEasyFormFieldStatus | undefined => formStatuses?.[fieldName],
);

export const createGetIsFormFieldPristine = (
  formName: string,
  fieldName: string,
) => createSelector(
  createGetFormFieldStatus(formName, fieldName),
  (fieldStatus: EEasyFormFieldStatus | undefined): boolean => (
    !fieldStatus || fieldStatus === EEasyFormFieldStatus.Pristine
  ),
);

export const createGetFormFieldSafetyValue = (
  formName: string,
  fieldName: string,
) => createSelector(
  createGetIsFormFieldPristine(formName, fieldName),
  createGetFormFieldInitialValue(formName, fieldName),
  createGetFormFieldValue(formName, fieldName),
  (
    isPristine: boolean,
    initialValue: any,
    value: any,
  ): any => (
    isPristine ? value || initialValue : value
  ),
);

export const createGetFormSafetyValues = (formName: string) => createSelector(
  createGetFormStatuses(formName),
  createGetFormInitialValues(formName),
  createGetFormValues(formName),
  (
    formStatuses: TEasyFormStatuses | undefined,
    formInitials: TShape | undefined,
    formValues: TShape | undefined,
  ): TShape | undefined => {
    if (!formStatuses || !formInitials || !formValues) {
      return;
    }

    const result: TShape = {};
    const setResultKeyValue = (key: string) => {
      result[key] = formStatuses[key] === EEasyFormFieldStatus.Pristine
        ? formValues[key] || formInitials[key]
        : formValues[key];
    };
    Object.keys(formInitials).forEach(setResultKeyValue);
    Object.keys(formValues).forEach(setResultKeyValue);
    return result;
  },
);
