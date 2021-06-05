import { TActionCreators } from './action-creators';
import { EEasyFormActionType, EEasyFormFieldStatus, EEasyFormField } from './enums';
import { TForms, TPseudoAnyEnum } from './types';

const setEasyFormValue = <S>(
  formState: S,
  formName: TPseudoAnyEnum,
  categoryName: EEasyFormField,
  fieldName: TPseudoAnyEnum,
  value: any,
) => {
  // @ts-ignore
  const newForm = formState[formName] ?? {};
  return {
    ...formState,
    [formName]: {
      ...newForm,
      [categoryName]: {
        ...(newForm[categoryName] ? newForm[categoryName] : {}),
        [fieldName]: value,
      },
    },
  };
};

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
      return setEasyFormValue<TForms<T, U>>(state, formName, EEasyFormField.Values, fieldName, value);
    }

    case EEasyFormActionType.ClearFieldValue: {
      const { formName, fieldName } = action.payload;
      if (!state[<T>formName]?.[EEasyFormField.Values]) {
        return state;
      }
      return setEasyFormValue<TForms<T, U>>(state, formName, EEasyFormField.Values, fieldName, null);
    }

    case EEasyFormActionType.SetFieldStatus: {
      const { formName, fieldName, status } = action.payload;
      return setEasyFormValue<TForms<T, U>>(state, formName, EEasyFormField.Statuses, fieldName, status);
    }

    case EEasyFormActionType.SetFieldErrors: {
      const { formName, fieldName, errors } = action.payload;
      return setEasyFormValue<TForms<T, U>>(state, formName, EEasyFormField.FieldErrors, fieldName, errors);
    }

    case EEasyFormActionType.ClearFieldErrors: {
      const { formName, fieldName } = action.payload;
      if (!state[<T>formName]?.[EEasyFormField.FieldErrors]) {
        return state;
      }
      return setEasyFormValue<TForms<T, U>>(state, formName, EEasyFormField.FieldErrors, fieldName, null);
    }

    case EEasyFormActionType.InitiateForm: {
      const { formName, initialValues } = action.payload;
      return {
        ...state,
        [formName]: {
          ...(state[<T>formName] || {}),
          [EEasyFormField.Initials]: <Partial<U[T]>>initialValues,
          [EEasyFormField.Statuses]: Object.keys(initialValues).reduce(<K extends keyof U[T]>(acc: { [L in K]: EEasyFormFieldStatus }, cur: K) => {
            acc[cur] = EEasyFormFieldStatus.Pristine;
            return acc;
          }, <{ [L in keyof U[T]]: EEasyFormFieldStatus }>{}),
        },
      };
    }

    case EEasyFormActionType.SetFormErrors: {
      const { formName, errors } = action.payload;
      return {
        ...state,
        [formName]: {
          ...(state[<T>formName] || {}),
          [EEasyFormField.FormErrors]: errors,
        },
      };
    }

    case EEasyFormActionType.DropForm: {
      const { formName } = action.payload;
      if (!state[<T>formName]) {
        return state;
      }
      const { [EEasyFormField.Initials]: initials, [EEasyFormField.Statuses]: statuses } = state[<T>formName];
      return {
        ...state,
        [formName]: {
          [EEasyFormField.Initials]: initials,
          [EEasyFormField.Statuses]: Object.keys(statuses).reduce(<K extends keyof U[T]>(acc: { [L in K]: EEasyFormFieldStatus }, cur: K) => {
            acc[cur] = EEasyFormFieldStatus.Pristine;
            return acc;
          }, <{ [L in keyof U[T]]: EEasyFormFieldStatus }>{}),
        },
      };
    }

    default:
      return state;
  }
};
