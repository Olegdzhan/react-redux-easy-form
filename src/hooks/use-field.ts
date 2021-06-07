import { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormContext } from '../form-context';
import {
  changeValue,
  changeValueAndValidate,
  clearValue,
  validateField,
} from '../middleware/middleware-actions';
import { RootValidator } from '../root-validator';
import {
  createGetFormFieldErrors,
  createGetFormFieldSafetyValue,
  createGetIsFormFieldPristine,
  createGetIsFormFieldValid
} from '../selectors';
import { TUseFieldSubscription, IFieldConfig } from '../types';

export const useField = <V>(
  fieldName: string,
  {
    changeValueGetter,
    validateOnChange,
    validators,
  }: IFieldConfig = {},
): TUseFieldSubscription<V> => {
  const formName = useContext(FormContext);
  if (!formName) {
    throw new ReferenceError(`It seems either you try to call useField hook for ${fieldName} field out of any Form
component, or did not set a formName to Form you provide.`);
  }
  if (validators) {
    const rootValidator = new RootValidator(formName);
    rootValidator.applyFieldValidators(fieldName, validators);
  }
  const value: V | null = useSelector(createGetFormFieldSafetyValue(formName, fieldName)) ?? null;
  const errors = useSelector(createGetFormFieldErrors(formName, fieldName));
  const isPristine = useSelector(createGetIsFormFieldPristine(formName, fieldName));
  const isFieldValid = useSelector(createGetIsFormFieldValid(formName, fieldName));

  const dispatch = useDispatch();

  const clear = useCallback((): void => {
    dispatch(clearValue(formName, fieldName));
  }, [dispatch, fieldName, formName]);

  const onChange = useCallback((inputData: any): void => {
    const change = validateOnChange ? changeValueAndValidate : changeValue;
    const nextValue = changeValueGetter ? changeValueGetter(inputData) : inputData;
    dispatch(change(formName, fieldName, nextValue));
  }, [changeValueGetter, dispatch, fieldName, formName, validateOnChange]);

  const validate = useCallback((): void => {
    dispatch(validateField(formName, fieldName));
  }, [dispatch, fieldName, formName]);

  return {
    clear,
    errors,
    isFieldValid,
    isPristine,
    onChange,
    validate,
    value,
  };
};
