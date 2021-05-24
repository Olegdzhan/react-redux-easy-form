import { createSelector } from 'reselect';
import { EEasyFormField, EEasyFormFieldStatus } from './enums';
import {
  TEasyForm,
  TEasyFormErrors,
  TEasyFormFieldErrors,
  TEasyFormStatuses,
  TFormFieldStruct,
  TForms,
  TObjectWithEnumKeys,
  TPseudoAnyEnum,
} from './types';

export const getForms = <
  Forms extends TForms,
  State extends { forms: Forms }
>(state: State): Forms => state.forms;

export const createGetForm = <
  FormStruct,
  Forms extends { [FormName in TPseudoAnyEnum]: TEasyForm<FormStruct> } = {}
>(
  formName: TPseudoAnyEnum,
) => createSelector(
  getForms,
  (forms: Forms): TEasyForm<FormStruct> | undefined => forms?.[formName],
);

export const createGetCommonFormErrors = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
) => createSelector(
  createGetForm<FormStruct>(formName),
  (form: TEasyForm<FormStruct> | undefined): string[] | null | undefined => form?.[EEasyFormField.FormErrors],
);

export const createGetFormAllFieldsErrors = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
) => createSelector(
  createGetForm<FormStruct>(formName),
  (
    form: TEasyForm<FormStruct> | undefined,
  ): TEasyFormFieldErrors<FormStruct> | undefined => form?.[EEasyFormField.FieldErrors],
);

export const createGetFormErrors = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
) => createSelector(
  createGetCommonFormErrors<FormStruct>(formName),
  createGetFormAllFieldsErrors<FormStruct>(formName),
  (
    formErrors: string[] | null | undefined,
    fieldErrors: TEasyFormFieldErrors<FormStruct> | undefined,
  ): TEasyFormErrors | undefined => {
    if (!fieldErrors && !formErrors) {
      return;
    }
    return {
      ...(fieldErrors ?? <TEasyFormFieldErrors<FormStruct>>{}),
      [EEasyFormField.FormErrors]: formErrors,
    };
  },
);

export const createGetIsFormValid = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
) => createSelector(
  createGetFormErrors<FormStruct>(formName),
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

export const createGetFormValues = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
) => createSelector(
  createGetForm<FormStruct>(formName),
  (form: TEasyForm<FormStruct> | undefined): Partial<FormStruct> | undefined => form?.[EEasyFormField.Values],
);

export const createGetFormInitialValues = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
) => createSelector(
  createGetForm<FormStruct>(formName),
  (form: TEasyForm<FormStruct> | undefined): Partial<FormStruct> | undefined => form?.[EEasyFormField.Initials],
);

export const createGetFormStatuses = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
) => createSelector(
  createGetForm<FormStruct>(formName),
  (
    form: TEasyForm<FormStruct> | undefined,
  ): TEasyFormStatuses<FormStruct> | undefined => form?.[EEasyFormField.Statuses],
);

export const createGetIsFormPristine = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
) => createSelector(
  createGetFormStatuses<FormStruct>(formName),
  (formStatuses: TEasyFormStatuses<FormStruct> | undefined): boolean => {
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

export const createGetFormFieldValue = <R, FormStruct extends TObjectWithEnumKeys = TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => createSelector(
  createGetFormValues<FormStruct>(formName),
  (formValues: Partial<FormStruct> | undefined): R | undefined => formValues?.[fieldName],
);

export const createGetFormFieldInitialValue = <R, FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => createSelector(
  createGetFormInitialValues<FormStruct>(formName),
  (formInitialValues: Partial<FormStruct> | undefined): R | undefined => formInitialValues?.[fieldName],
);

export const createGetFormFieldErrors = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => createSelector(
  createGetFormAllFieldsErrors<FormStruct>(formName),
  (
    allFormFieldsErrors: TEasyFormFieldErrors<FormStruct> | undefined,
  ): string[] | null | undefined => allFormFieldsErrors?.[fieldName],
);

export const createGetIsFormFieldValid = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => createSelector(
  createGetFormFieldErrors<FormStruct>(formName, fieldName),
  (formFieldErrors: string[] | null | undefined): boolean => !formFieldErrors,
);

export const createGetFormFieldStatus = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => createSelector(
  createGetFormStatuses<FormStruct>(formName),
  (
    formStatuses: TEasyFormStatuses<FormStruct> | undefined,
  ): EEasyFormFieldStatus | undefined => formStatuses?.[fieldName],
);

export const createGetIsFormFieldPristine = <FormStruct extends TObjectWithEnumKeys>(
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
) => createSelector(
  createGetFormFieldStatus<FormStruct>(formName, fieldName),
  (
    fieldStatus: EEasyFormFieldStatus | undefined,
  ): boolean => !fieldStatus || fieldStatus === EEasyFormFieldStatus.Pristine,
);

export const createGetFormStateFieldData = <FormStruct extends TObjectWithEnumKeys, Value>(
  formName: TPseudoAnyEnum,
  fieldName: TPseudoAnyEnum,
  providedFormStateFields: EEasyFormField[] = [EEasyFormField.Values, EEasyFormField.Statuses],
) => createSelector(
  createGetForm<FormStruct>(formName),
  (form: TEasyForm<FormStruct> | undefined): TFormFieldStruct<Value> | undefined => {
    if (!form) {
      return;
    }
    if (!providedFormStateFields.includes(EEasyFormField.Statuses)) {
      var safetyProvidedFields = [...providedFormStateFields];
      safetyProvidedFields.push(EEasyFormField.Statuses);
    }
    const providedField = safetyProvidedFields ?? providedFormStateFields;
    return providedField.reduce((acc: TFormFieldStruct<Value>, cur: EEasyFormField) => {
      // @ts-ignore
      acc[cur] = cur === EEasyFormField.FormErrors
        ? form[cur]
        : form[cur]?.[fieldName];
      return acc;
    }, <TFormFieldStruct<Value>>{})
  },
);
