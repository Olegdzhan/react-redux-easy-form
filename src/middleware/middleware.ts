import { AnyAction, Dispatch, Store } from 'redux';
import {
  clearFieldValue,
  clearFieldErrors,
  setFieldErrors,
  setFieldStatus,
  setFieldValue,
} from '../action-creators';
import { EEasyFormFieldStatus } from '../enums';
import {
  createGetFormFieldErrors,
  createGetFormFieldValue,
  createGetIsFormFieldPristine,
  getForms,
} from '../selectors';
import { TForms, TValidator } from '../types';
import { changeValue, validateField } from './middleware-actions';
import { EEasyFormLogicActionType } from './middleware-enums';

export const easyFormLogic = <S extends { forms: TForms }>
  (store: Store<S>) => (next: Dispatch) => (action: AnyAction) => {
    const state: S = store.getState();
    const formsState = getForms(state);
    if (!formsState) {
      throw new Error(
        'You have to include easyFormReducer to your application Store before easyFormLogic middleware applying.',
      );
    }

    switch (action.type) {
      case EEasyFormLogicActionType.ChangeValue: {
        const { formName, fieldName, value } = action.payload;
        next(setFieldValue(formName, fieldName, value));
        return next(setFieldStatus(formName, fieldName, EEasyFormFieldStatus.Dirty));
      }

      case EEasyFormLogicActionType.ClearValue: {
        const { formName, fieldName } = action.payload;
        next(clearFieldValue(formName, fieldName));
        return next(setFieldStatus(formName, fieldName, EEasyFormFieldStatus.Dirty));
      }

      case EEasyFormLogicActionType.ChangeValueAndValidate: {
        const { formName, fieldName, value, validators } = action.payload;
        store.dispatch(changeValue(formName, fieldName, value));
        return store.dispatch(validateField(formName, fieldName, validators));
      }

      case EEasyFormLogicActionType.ValidateField: {
        const { formName, fieldName, validators } = action.payload;
        const currentFieldValue = createGetFormFieldValue<any>(formName, fieldName)(state);
        const fieldIsPristine = createGetIsFormFieldPristine(formName, fieldName);
        if (fieldIsPristine) {
          return;
        }
        const nextFieldErrors: string[] = validators.map((validator: TValidator) => validator(currentFieldValue))
          .filter((val: ReturnType<TValidator>): val is string => Boolean(val));
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

      }

      default:
        return next(action);
    }
  };
