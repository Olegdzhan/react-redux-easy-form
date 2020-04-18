// @flow

import * as actionTypes from './actionTypes';
import { FieldStatus } from './constants';
import type { TFormsBranchState } from './types/TFormsBranchState';
import type { TAnyFormAction } from './types/private/TAnyFormAction';

export default (FormsMap: { [k: string]: string }) => {
  const defaultState: TFormsBranchState = {};
  Object.keys(FormsMap).forEach((key: string): void => {
    defaultState[FormsMap[key]] = {
      statuses: {},
      emptyValues: {},
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
        const stateStatuses = state[formName].statuses;
        const statuses = stateStatuses[fieldKey] === FieldStatus.Pristine
          ? { ...stateStatuses, [fieldKey]: FieldStatus.Dirty }
          : stateStatuses;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            currentValues: {
              ...state[formName].currentValues,
              [fieldKey]: value,
            },
            statuses,
          },
        };
      }

      case actionTypes.SET_EMPTY_VALUES: {
        const { formName, fieldsConfig } = action.payload;
        const emptyValues = {};
        Object.keys(fieldsConfig).forEach((fieldKey: string) => {
          emptyValues[fieldKey] = fieldsConfig[fieldKey].emptyValue;
        });
        return {
          ...state,
          [formName]: {
            ...state[formName],
            emptyValues,
          },
        };
      }

      case actionTypes.SET_INITIAL_VALUES: {
        const { formName, initialValues } = action.payload;
        const statuses = {};
        Object.keys(initialValues).forEach((fieldKey: string): void => {
          statuses[fieldKey] = FieldStatus.Pristine;
        });
        return {
          ...state,
          [formName]: {
            ...state[formName],
            initialValues,
            statuses,
          },
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
              [fieldKey]: errorMessage,
            },
          },
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
              [fieldKey]: null,
            },
          },
        };
      }

      case actionTypes.VALIDATE_FORM: {
        const { formName, errorsArray } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            formErrors: errorsArray,
          },
        };
      }

      case actionTypes.CLEAR_FORM_ERRORS: {
        const { formName } = action.payload;
        return {
          ...state,
          [formName]: {
            ...state[formName],
            formErrors: [],
          },
        };
      }

      case actionTypes.DROP_FORM: {
        const { formName, restoreInitials } = action.payload;
        const initialValues = restoreInitials
          ? state[formName].initialValues
          : state[formName].emptyValues;
        const statuses = {};
        Object.keys(state[formName].statuses).forEach(fieldKey => statuses[fieldKey] = FieldStatus.Pristine);
        return {
          ...state,
          [formName]: {
            ...defaultState[formName],
            currentValues: initialValues,
            initialValues,
            statuses,
          },
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
              [fieldKey]: FieldStatus.Dirty,
            },
          },
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
              [fieldKey]: FieldStatus.Pristine,
            },
          },
        };
      }

      default:
        return state;
    }
  };
};
