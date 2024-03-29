import { AnyAction, Dispatch, Store } from 'redux';
import {
  clearFieldValue,
  clearFieldErrors,
  setFieldErrors,
  setFieldStatus,
  setFieldValue,
  setFormErrors,
} from '../action-creators';
import { EEasyFormFieldStatus } from '../enums';
import { RootValidator } from '../root-validator';
import {
  createGetFormFieldErrors,
  createGetFormFieldSafetyValue,
  createGetFormSafetyValues,
  createGetIsFormFieldPristine,
  getForms,
} from '../selectors';
import { TExternalApplicationState, TValidator } from '../types';
import { changeValue, validateField } from './middleware-actions';
import { EEasyFormLogicActionType } from './middleware-enums';

export const easyFormMiddleware =
  (store: Store) => (next: Dispatch) => (action: AnyAction) => {
    const state: TExternalApplicationState = store.getState();
    const formsState = getForms(state);
    if (!formsState) {
      throw new Error(
        'You have to include easyFormReducer to your application Store before easyFormLogic middleware applying.',
      );
    }

    switch (action.type) {
      case EEasyFormLogicActionType.ChangeValue: {
        const { formName, fieldName, value } = action.payload;
        const fieldIsPristine = createGetIsFormFieldPristine(formName, fieldName)(state);
        if (fieldIsPristine) {
          next(setFieldStatus(formName, fieldName, EEasyFormFieldStatus.Dirty));
        }
        return next(setFieldValue(formName, fieldName, value));
      }

      case EEasyFormLogicActionType.ClearValue: {
        const { formName, fieldName } = action.payload;
        const fieldIsPristine = createGetIsFormFieldPristine(formName, fieldName)(state);
        if (fieldIsPristine) {
          next(setFieldStatus(formName, fieldName, EEasyFormFieldStatus.Dirty));
        }
        next(clearFieldValue(formName, fieldName));
        const rootValidator = new RootValidator(formName);
        const fieldsValidators = rootValidator.validators[1];
        return fieldsValidators[fieldName] ? store.dispatch(validateField(formName, fieldName)) : undefined;
      }

      case EEasyFormLogicActionType.ChangeValueAndValidate: {
        const { formName, fieldName, value } = action.payload;
        store.dispatch(changeValue(formName, fieldName, value));
        return store.dispatch(validateField(formName, fieldName));
      }

      case EEasyFormLogicActionType.ValidateField: {
        const { formName, fieldName } = action.payload;
        const currentFieldValue: any = createGetFormFieldSafetyValue(formName, fieldName)(state);

        const rootValidator = new RootValidator(formName);
        const fieldsValidators = rootValidator.validators[1];
        if (!fieldsValidators[fieldName]) {
          throw new Error(`Seems you try to validate field ${fieldName as string} of form ${formName as string}, but have not set the validator function for the field`);
        }
        const nextFieldErrors: string[] = fieldsValidators[fieldName].map(
          (validator: TValidator) => validator(currentFieldValue, state)
        ).filter((val: ReturnType<TValidator>): val is string => Boolean(val));

        const fieldErrors = createGetFormFieldErrors(formName, fieldName)(state);
        if (fieldErrors && !nextFieldErrors.length) {
          return next(clearFieldErrors(formName, fieldName));
        }
        if (nextFieldErrors.length) {
          return next(setFieldErrors(formName, fieldName, nextFieldErrors));
        }
        return;
      }

      case EEasyFormLogicActionType.ValidateAll: {
        const { formName } = action.payload;
        const rootValidator = new RootValidator(formName);
        const [formValidator, fieldsValidators] = rootValidator.validators;
        const values = createGetFormSafetyValues(formName)(state);

        if (!values) {
          return next(action);
        }

        if (formValidator) {
          const errors = formValidator(values, state);
          next(setFormErrors(formName, errors));
        }

        const validationKeys = Object.keys(fieldsValidators);
        if (validationKeys.length) {
          validationKeys.forEach((key) => {
            store.dispatch(validateField(formName, key));
          })
        }
        return next(action);
      }

      default:
        return next(action);
    }
  };
