// @flow

// HOC, its config types and injecting props types
export { default as easyForm } from './decorator/easyForm';
export type { TEasyFormValidateConfig } from './types/TEasyFormValidateConfig';
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
export { clearFieldError } from './actionCreators/clearFieldError';
export type { TClearFieldErrorAction } from './actionCreators/clearFieldError';
export { clearFormErrors } from './actionCreators/clearFormErrors';
export type { TClearFormErrorsAction } from './actionCreators/clearFormErrors';
export { dropForm } from './actionCreators/dropForm';
export type { TDropFormAction } from './actionCreators/dropForm';
export { makeDirty } from './actionCreators/makeDirty';
export type { TMakeDirtyAction } from './actionCreators/makeDirty';
export { makePristine } from './actionCreators/makePristine';
export type { TMakePristineAction } from './actionCreators/makePristine';
export { setInitialValues } from './actionCreators/setInitialValues';
export type { TSetInitialValuesAction } from './actionCreators/setInitialValues';
export { setEmptyValues } from './actionCreators/setEmptyValues';
export type { TSetEmptyValuesAction } from './actionCreators/setEmptyValues';
export { setValue } from './actionCreators/setValue';
export type { TSetValueAction } from './actionCreators/setValue';
export { validateField } from './actionCreators/validateField';
export type { TValidateFieldAction } from './actionCreators/validateField';
export { validateForm } from './actionCreators/validateForm';
export type { TValidateFormAction } from './actionCreators/validateForm';

// selectors
export { default as rootFormsSelector } from './selectors/rootFormsSelector';
export { default as selectForm } from './selectors/selectForm';
export { default as selectFormErrors } from './selectors/selectFormErrors';
export { default as selectFormFieldErrors } from './selectors/selectFormFieldErrors';
export { default as selectFormInitialValues } from './selectors/selectFormInitialValues';
export { default as selectFormCurrentValues } from './selectors/selectFormCurrentValues';
export { default as selectFormStatuses } from './selectors/selectFormStatuses';
export { default as selectFormValues } from './selectors/selectFormValues';
export { default as selectFormStructuredProps } from './selectors/selectFormStructuredProps';

// constants
export { FieldStatus } from './constants';
export type { TFieldStatus } from './constants';
