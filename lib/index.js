// @flow

export { default as easyForm } from './decorator/easyForm';

// Reducer-creator and its types
export {
  default as getFormsReducer,
  type TFormState,
  type TFormsBranchState,
  type TAnyFormAction,
} from './reducer';

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
