import { TActionCreators } from './action-creators';
import { EEasyFormActionType, EEasyFormFieldStatus, EEasyFormField } from './enums';
import { TForms, TPseudoAnyEnum } from './types';

/*
 * To fill the function generic, use two types
 * 1. enum of formNames, used in the application, i.e.:
 *    enum EFormName { Profile, Contacts }
 * 2. type of each form fields:
 *    type TForm = {
 *      [EFormName.Profile]: {
 *        name: string;
 *        age: number;
 *      };
 *      [EFormName.Contacts]: {
 *        phone: string;
 *        email: string;
 *      };
 *    };
 */
export const easyFormReducer = <T extends TPseudoAnyEnum, U extends { [P in T]: { [k: string]: any } }>(
  state: TForms<T, U> = {},
  action: TActionCreators,
): TForms<T, U> => {
  switch (action.type) {
    case EEasyFormActionType.SetFieldValue: {
      const { formName, fieldName, value } = action.payload;
      const immutableState = { ...state };
      if (!immutableState[<T>formName]) {
        immutableState[<T>formName] = {
          [EEasyFormField.Values]: <U[T]>{ [fieldName]: value },
        };
      } else {
        const formValues = immutableState[<T>formName][EEasyFormField.Values]
          ? { ...immutableState[<T>formName][EEasyFormField.Values], [fieldName]: value }
          : { [fieldName]: value };
        immutableState[<T>formName][EEasyFormField.Values] = <Partial<U[T]>>formValues;
      }
      return immutableState;
    }

    case EEasyFormActionType.ClearFieldValue: {
      const { formName, fieldName } = action.payload;
      if (!state[<T>formName]?.[EEasyFormField.Values]) {
        return state;
      }
      const immutableState = { ...state };
      immutableState[<T>formName][EEasyFormField.Values] = {
        ...immutableState[<T>formName][EEasyFormField.Values],
        [fieldName]: null,
      };
      return immutableState;
    }

    case EEasyFormActionType.SetFieldStatus: {
      const { formName, fieldName, status } = action.payload;
      const immutableState = { ...state };
      if (!immutableState[<T>formName]) {
        immutableState[<T>formName] = <TForms<T, U>[T]>{
          [EEasyFormField.Statuses]: <{ [L in keyof U[T]]?: EEasyFormFieldStatus }>{ [fieldName]: status },
        };
      } else {
        const formStatuses = immutableState[<T>formName][EEasyFormField.Statuses]
          ? { ...immutableState[<T>formName][EEasyFormField.Statuses], [fieldName]: status }
          : { [fieldName]: status };
        immutableState[<T>formName][EEasyFormField.Statuses] = <{ [L in keyof U[T]]: EEasyFormFieldStatus }>formStatuses;
      }
      return immutableState;
    }

    case EEasyFormActionType.SetFieldErrors: {
      const { formName, fieldName, errors } = action.payload;
      const immutableState = { ...state };
      if (!immutableState[<T>formName]) {
        immutableState[<T>formName] = {
          [EEasyFormField.FieldErrors]: <{ [L in keyof U[T]]?: string[] | null }>{ [fieldName]: errors },
        };
      } else {
        const formErrors = immutableState[<T>formName][EEasyFormField.FieldErrors]
          ? { ...immutableState[<T>formName][EEasyFormField.FieldErrors], [fieldName]: errors }
          : { [fieldName]: errors };
        immutableState[<T>formName][EEasyFormField.FieldErrors] = <{ [L in keyof U[T]]?: string[] | null }>formErrors;
      }
      return immutableState;
    }

    case EEasyFormActionType.ClearFieldErrors: {
      const { formName, fieldName } = action.payload;
      if (!state[<T>formName]?.[EEasyFormField.FieldErrors]) {
        return state;
      }
      const immutableState = { ...state };
      immutableState[<T>formName][EEasyFormField.FieldErrors] = {
        ...immutableState[<T>formName][EEasyFormField.FieldErrors],
        [fieldName]: null,
      };
      return immutableState;
    }

    case EEasyFormActionType.InitiateForm: {
      const { formName, initialValues } = action.payload;
      const immutableState = { ...state };
      immutableState[<T>formName] = {
        [EEasyFormField.Initials]: <Partial<U[T]>>initialValues,
        [EEasyFormField.Statuses]: Object.keys(initialValues).reduce(<K extends keyof U[T]>(acc: { [L in K]: EEasyFormFieldStatus }, cur: K) => {
          acc[cur] = EEasyFormFieldStatus.Pristine;
          return acc;
        }, <{ [L in keyof U[T]]: EEasyFormFieldStatus }>{})
      };
      return immutableState;
    }

    case EEasyFormActionType.SetFormErrors: {
      const { formName, errors } = action.payload;
      const immutableState = { ...state };
      if (!immutableState[<T>formName]) {
        immutableState[<T>formName] = { [EEasyFormField.FormErrors]: errors };
      } else {
        immutableState[<T>formName][EEasyFormField.FormErrors] = errors;
      }
      return immutableState;
    }

    case EEasyFormActionType.DropForm: {
      const { formName } = action.payload;
      if (!state[<T>formName]) {
        return state;
      }
      const { [EEasyFormField.Initials]: initials, [EEasyFormField.Statuses]: statuses } = state[<T>formName];
      const immutableState = { ...state };
      delete immutableState[<T>formName];
      immutableState[<T>formName] = {
        [EEasyFormField.Initials]: initials,
        [EEasyFormField.Statuses]: Object.keys(statuses).reduce(<K extends keyof U[T]>(acc: { [L in K]: EEasyFormFieldStatus }, cur: K) => {
          acc[cur] = EEasyFormFieldStatus.Pristine;
          return acc;
        }, <{ [L in keyof U[T]]: EEasyFormFieldStatus }>{}),
      };
      return immutableState;
    }

    default:
      return state;
  }
};
