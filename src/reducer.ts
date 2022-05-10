import { TActionCreators } from './action-creators';
import { EEasyFormActionType, EEasyFormFieldStatus, EEasyFormField } from './enums';
import { TForms } from './types';
import { deepEqual } from './utils';

const setEasyFormValue = (
  formState: TForms,
  formName: string,
  categoryName: EEasyFormField,
  fieldName: string,
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
export const easyFormReducer = (state: TForms = {}, action: TActionCreators): TForms => {
  switch (action.type) {
    case EEasyFormActionType.SetFieldValue: {
      const { formName, fieldName, value } = action.payload;
      return setEasyFormValue(state, formName, EEasyFormField.Values, fieldName, value);
    }

    case EEasyFormActionType.ClearFieldValue: {
      const { formName, fieldName } = action.payload;
      if (!state[formName]?.[EEasyFormField.Values]) {
        return state;
      }
      return setEasyFormValue(state, formName, EEasyFormField.Values, fieldName, null);
    }

    case EEasyFormActionType.SetFieldStatus: {
      const { formName, fieldName, status } = action.payload;
      return setEasyFormValue(state, formName, EEasyFormField.Statuses, fieldName, status);
    }

    case EEasyFormActionType.SetFieldErrors: {
      const { formName, fieldName, errors } = action.payload;
      return setEasyFormValue(state, formName, EEasyFormField.FieldErrors, fieldName, errors);
    }

    case EEasyFormActionType.ClearFieldErrors: {
      const { formName, fieldName } = action.payload;
      if (!state[formName]?.[EEasyFormField.FieldErrors]) {
        return state;
      }
      return setEasyFormValue(state, formName, EEasyFormField.FieldErrors, fieldName, null);
    }

    case EEasyFormActionType.InitiateForm: {
      const { formName, initialValues } = action.payload;

      const isEqualInitials = deepEqual(initialValues, state[formName][EEasyFormField.Initials]);
      if (isEqualInitials) {
        return state;
      }

      return {
        ...state,
        [formName]: {
          ...(state[formName] || {}),
          [EEasyFormField.Initials]: initialValues,
          [EEasyFormField.Statuses]: Object.keys(initialValues).reduce((acc: { [k: string]: EEasyFormFieldStatus }, cur: string) => {
            acc[cur] = EEasyFormFieldStatus.Pristine;
            return acc;
          }, <{ [k: string]: EEasyFormFieldStatus }>{}),
        },
      };
    }

    case EEasyFormActionType.SetFormErrors: {
      const { formName, errors } = action.payload;
      return {
        ...state,
        [formName]: {
          ...(state[formName] || {}),
          [EEasyFormField.FormErrors]: errors,
        },
      };
    }

    case EEasyFormActionType.DropForm: {
      const { formName } = action.payload;
      if (!state[formName]) {
        return state;
      }
      const { [EEasyFormField.Initials]: initials, [EEasyFormField.Statuses]: statuses } = state[formName];
      return {
        ...state,
        [formName]: {
          [EEasyFormField.Initials]: initials,
          [EEasyFormField.Statuses]: Object.keys(statuses).reduce((acc: { [k: string]: EEasyFormFieldStatus }, cur: string) => {
            acc[cur] = EEasyFormFieldStatus.Pristine;
            return acc;
          }, <{ [k: string]: EEasyFormFieldStatus }>{}),
        },
      };
    }

    default:
      return state;
  }
};
