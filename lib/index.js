// @flow

// HOC, its config types, injecting props types
export { default as easyForm } from './decorator/easyForm';
export type { TDecoratedFormProps } from './types/TDecoratedFormProps';
export type { TEasyFormHocProps } from './types/TEasyFormHocProps';
export type { TEasyFormHocErrorsField } from './types/TEasyFormHocErrorsField';
export type { TEasyFormHocFormErrors } from './types/TEasyFormHocFormErrors';
export type { TEasyFormHocStatusesField } from './types/TEasyFormHocStatusesField';
export type { TEasyFormHocValuesField } from './types/TEasyFormHocValuesField';
export type { TEasyFormHocActions } from './types/TEasyFormHocActions';
export type { TFormStructuredProps } from './types/TFormStructuredProps';
export type { TEasyFormConfig } from './types/TEasyFormConfig';
export type { TEasyFormFieldConfig } from './types/TEasyFormFieldConfig';
export type { TEasyFormFieldValidator } from './types/TEasyFormFieldValidator';

// Reducer-creator and redux-state types
export { default as getFormsReducer } from './reducer';
export type { TFormsBranchState } from './types/TFormsBranchState';
export type { TFormState } from './types/TFormState';

// Action-creators and action-creators payload types
export {
  clearFieldError,
  type TClearFieldErrorActionPayload,
} from './actionCreators/clearFieldError';
export {
  clearFormErrors,
  type TClearFormErrorsActionPayload
} from './actionCreators/clearFormErrors';
export {
  dropForm,
  type TDropFormActionPayload,
} from './actionCreators/dropForm';
export {
  makeDirty,
  type TMakeDirtyActionPayload,
} from './actionCreators/makeDirty';
export {
  makePristine,
  type TMakePristineActionPayload,
} from './actionCreators/makePristine';
export {
  setInitialValues,
  type TSetInitialValuesActionPayload,
} from './actionCreators/setInitialValues';
export {
  setValue,
  type TSetValueActionPayload,
} from './actionCreators/setValue';
export {
  validateField,
  type TValidateFieldActionPayload,
} from './actionCreators/validateField';
export {
  validateForm,
  type TValidateFormActionPayload,
} from './actionCreators/validateForm';

// selectors
export { default as rootFormsSelector } from './selectors/rootFormsSelector';
export { default as selectForm } from './selectors/selectForm';
export { default as selectFormErrors } from './selectors/selectFormErrors';
export { default as selectFormFieldErrors } from './selectors/selectFormFieldErrors';
export { default as selectFormInitialValues } from './selectors/selectFormInitialValues';
export { default as selectFormStatuses } from './selectors/selectFormStatuses';
export { default as selectFormValues } from './selectors/selectFormValues';
export { default as selectFormStructuredProps } from './selectors/selectFormStructuredProps';
