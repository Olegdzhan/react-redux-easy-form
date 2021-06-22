import { createSelector, Selector } from 'reselect';
import { EEasyFormField, EEasyFormFieldStatus } from './enums';
import {
  TEasyForm,
  TEasyFormErrors,
  TEasyFormFieldErrors,
  TEasyFormStatuses,
  TExternalApplicationState,
  TForms,
  TShape,
} from './types';

export const getForms = (state: TExternalApplicationState): TForms => state.forms;

export const createGetForm = (formName: string): Selector<TExternalApplicationState, TEasyForm | undefined> => (
  createSelector(
    getForms,
    (forms: TForms): TEasyForm | undefined => forms?.[formName],
  )
);

export const createGetCommonFormErrors = (formName: string): Selector<
  TExternalApplicationState,
  string[] | null | undefined
> => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): string[] | null | undefined => form?.[EEasyFormField.FormErrors],
);

export const createGetFormAllFieldsErrors = (formName: string): Selector<
  TExternalApplicationState,
  TEasyFormFieldErrors | undefined
> => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): TEasyFormFieldErrors | undefined => form?.[EEasyFormField.FieldErrors],
);

export const createGetFormErrors = (formName: string): Selector<
  TExternalApplicationState,
  TEasyFormErrors | undefined
> => createSelector(
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

export const createGetIsFormValid = (formName: string): Selector<TExternalApplicationState, boolean> => createSelector(
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

export const createGetFormValues = (formName: string): Selector<TExternalApplicationState, TShape | undefined> => (
  createSelector(
    createGetForm(formName),
    (form: TEasyForm | undefined): TShape | undefined => form?.[EEasyFormField.Values],
  )
);

export const createGetFormInitialValues = (formName: string): Selector<
  TExternalApplicationState,
  TShape | undefined
> => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): TShape | undefined => form?.[EEasyFormField.Initials],
);

export const createGetFormStatuses = (formName: string): Selector<
  TExternalApplicationState,
  TEasyFormStatuses | undefined
> => createSelector(
  createGetForm(formName),
  (form: TEasyForm | undefined): TEasyFormStatuses | undefined => form?.[EEasyFormField.Statuses],
);

export const createGetIsFormPristine = (formName: string): Selector<TExternalApplicationState, boolean> => (
  createSelector(
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
  )
);

export const createGetFormFieldValue = (
  formName: string,
  fieldName: string,
): Selector<TExternalApplicationState, any> => createSelector(
  createGetFormValues(formName),
  (formValues: TShape | undefined): any => formValues?.[fieldName],
);

export const createGetFormFieldInitialValue = (
  formName: string,
  fieldName: string,
): Selector<TExternalApplicationState, any> => createSelector(
  createGetFormInitialValues(formName),
  (formInitialValues: TShape | undefined): any => formInitialValues?.[fieldName],
);

export const createGetFormFieldErrors = (
  formName: string,
  fieldName: string,
): Selector<TExternalApplicationState, string[] | null | undefined> => createSelector(
  createGetFormAllFieldsErrors(formName),
  (allFormFieldsErrors: TEasyFormFieldErrors | undefined): string[] | null | undefined => (
    allFormFieldsErrors?.[fieldName]
  ),
);

export const createGetIsFormFieldValid = (
  formName: string,
  fieldName: string,
): Selector<TExternalApplicationState, boolean> => createSelector(
  createGetFormFieldErrors(formName, fieldName),
  (formFieldErrors: string[] | null | undefined): boolean => !formFieldErrors,
);

export const createGetFormFieldStatus = (
  formName: string,
  fieldName: string,
): Selector<TExternalApplicationState, EEasyFormFieldStatus | undefined> => createSelector(
  createGetFormStatuses(formName),
  (formStatuses: TEasyFormStatuses | undefined): EEasyFormFieldStatus | undefined => formStatuses?.[fieldName],
);

export const createGetIsFormFieldPristine = (
  formName: string,
  fieldName: string,
): Selector<TExternalApplicationState, boolean> => createSelector(
  createGetFormFieldStatus(formName, fieldName),
  (fieldStatus: EEasyFormFieldStatus | undefined): boolean => (
    !fieldStatus || fieldStatus === EEasyFormFieldStatus.Pristine
  ),
);

export const createGetFormFieldSafetyValue = (
  formName: string,
  fieldName: string,
): Selector<TExternalApplicationState, any> => createSelector(
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

export const createGetFormSafetyValues = (formName: string): Selector<
  TExternalApplicationState,
  TShape | undefined
> => createSelector(
  createGetFormStatuses(formName),
  createGetFormInitialValues(formName),
  createGetFormValues(formName),
  (
    formStatuses: TEasyFormStatuses | undefined,
    formInitials: TShape | undefined,
    formValues: TShape | undefined,
  ): TShape | undefined => {
    if (!formStatuses || (!formInitials && !formValues)) {
      return;
    }

    const result: TShape = {};
    const setResultKeyValue = (key: string): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result[key] = formStatuses[key] === EEasyFormFieldStatus.Pristine || !formStatuses[key]
        ? formValues?.[key] || formInitials?.[key]
        : formValues?.[key];
    };

    [formInitials, formValues]
      .filter(Boolean)
      .forEach((values: TShape): void => {
        Object.keys(values).forEach(setResultKeyValue);
      });
    return result;
  },
);
