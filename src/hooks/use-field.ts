import { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormContext } from '../form-context';
import {
  changeValue,
  changeValueAndValidate,
  validateField,
} from '../middleware/middleware-actions';
import { RootValidator } from '../root-validator';
import {
  createGetFormFieldErrors,
  createGetFormFieldValueForValidation,
  createGetIsFormFieldPristine,
  createGetIsFormFieldValid
} from '../selectors';
import { TPseudoAnyEnum, TUseFieldSubscription, IFieldConfig } from '../types';

export const useField = <V>(
  fieldName: TPseudoAnyEnum,
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
  const value: V | null = useSelector(createGetFormFieldValueForValidation(formName, fieldName)) ?? null;
  const errors = useSelector(createGetFormFieldErrors(formName, fieldName));
  const isPristine = useSelector(createGetIsFormFieldPristine(formName, fieldName));
  const isFieldValid = useSelector(createGetIsFormFieldValid(formName, fieldName));

  const dispatch = useDispatch();

  const onChange = useCallback((value: any): void => {
    const change = validateOnChange ? changeValueAndValidate : changeValue;
    const nextValue = changeValueGetter ? changeValueGetter(value) : value;
    dispatch(change(formName, fieldName, nextValue));
  }, [changeValueGetter, dispatch, fieldName, formName, validateOnChange]);

  const validate = useCallback((): void => {
    dispatch(validateField(formName, fieldName));
  }, [dispatch, fieldName, formName]);

  return {
    errors,
    isFieldValid,
    isPristine,
    onChange,
    validate,
    value,
  };
};
