// @flow

import * as actionTypes from './actionTypes';
import type { TAction } from './types/TAction';
import type { TClearFieldErrorActionPayload } from './actionCreators/clearFieldError';
import type { TClearFormErrorsActionPayload } from './actionCreators/clearFormErrors';
import type { TDropFormActionPayload } from './actionCreators/dropForm';
import type { TMakeDirtyActionPayload } from './actionCreators/makeDirty';
import type { TMakePristineActionPayload } from './actionCreators/makePristine';
import type { TSetInitialValuesActionPayload } from './actionCreators/setInitialValues';
import type { TSetValueActionPayload } from './actionCreators/setValue';
import type { TValidateFieldActionPayload } from './actionCreators/validateField';
import type { TValidateFormActionPayload } from './actionCreators/validateForm';

export type TFormState = {
  statuses: { [k: string]: 'dirty' | 'pristine' };
  initialValues: { [k: string]: any };
  currentValues: { [k: string]: any };
  fieldErrors: { [k: string]: string | null };
  formErrors: string[];
};

export type TFormsBranchState = {
  [k: string]: TFormState;
};

export type TAnyFormAction = TAction<
  TClearFieldErrorActionPayload
  | TClearFormErrorsActionPayload
  | TDropFormActionPayload
  | TMakeDirtyActionPayload
  | TMakePristineActionPayload
  | TSetInitialValuesActionPayload
  | TSetValueActionPayload
  | TValidateFieldActionPayload
  | TValidateFormActionPayload
>;

export default (FormsList: { [k: string]: string }) => {
  const defaultState: TFormsBranchState = {};
  Object.keys(FormsList).forEach((key: string): void => {
    defaultState[FormsList[key]] = {
      statuses: {},
      initialValues: {},
      currentValues: {},
      fieldErrors: {},
      formErrors: [],
    };
  });

  return (state: TFormsBranchState = defaultState, action: TAnyFormAction) => {
    switch (action.type) {
      // TODO: implement each case as a separate helper-function call
      case actionTypes.SET_VALUE: {
        const { formName, fieldKey, value } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            currentValues: {
              ...state[formName].currentValues,
              [fieldKey]: value
            }
          }
        };
      }

      case actionTypes.SET_INITIAL_VALUES: {
        const { formName, initialValues } = action.payload;
        const statuses = {};
        Object.keys(initialValues).forEach((fieldKey: string): void => {
          // TODO: implement statuses as constants
          statuses[fieldKey] = 'pristine';
        });
        return {
          ...state,
          [formName]: {
            ...state[formName],
            initialValues,
            statuses
          }
        };
      }

      case actionTypes.VALIDATE_FIELD: {
        const { formName, fieldKey, errorMessage } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            fieldErrors: {
              ...state[formName].fieldErrors,
              [fieldKey]: errorMessage
            }
          }
        };
      }

      case actionTypes.CLEAR_FIELD_ERROR: {
        const { formName, fieldKey } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            fieldErrors: {
              ...state[formName].fieldErrors,
              [fieldKey]: null
            }
          }
        };
      }

      case actionTypes.VALIDATE_FORM: {
        const { formName, errorsArray } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            formErrors: errorsArray
          }
        };
      }

      case actionTypes.CLEAR_FORM_ERRORS: {
        const { formName } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            formErrors: []
          }
        };
      }

      case actionTypes.DROP_FORM: {
        const { formName, saveInitial } = action.payload;
        const initialValues = saveInitial ? state[formName].initialValues : defaultState[formName].initialValues;
        const statuses = {};
        Object.keys(state[formName].statuses).forEach(fieldKey => statuses[fieldKey] = 'pristine');
        return {
          ...state,
          [formName]: {
            ...defaultState[formName],
            initialValues,
            statuses
          }
        };
      }

      case actionTypes.MAKE_DIRTY: {
        const { formName, fieldKey } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            statuses: {
              ...state[formName].statuses,
              [fieldKey]: 'dirty'
            }
          }
        };
      }

      case actionTypes.MAKE_PRISTINE: {
        const { formName, fieldKey } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            statuses: {
              ...state[formName].statuses,
              [fieldKey]: 'pristine'
            }
          }
        };
      }

      default:
        return state;
    }
  };
}