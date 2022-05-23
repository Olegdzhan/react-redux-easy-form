import React, {
  FormHTMLAttributes,
  memo,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { initiateForm, dropForm } from '../action-creators';
import { FormContext } from '../form-context';
import { RootValidator } from '../root-validator';
import { TFormValidator, TShape } from '../types';

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  dropOnUnmount?: boolean;
  initialValues?: TShape;
  name: string;
  validate?: TFormValidator;
}

export const Form = memo<IFormProps>(({
  children,
  dropOnUnmount,
  initialValues= {},
  name,
  validate,
  ...htmlFormProps
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (validate) {
      const rootValidator = new RootValidator(name);
      rootValidator.applyFormValidator(validate);
    }
  }, []);

  useEffect(() => {
    dispatch(initiateForm(name, initialValues));
  }, [initialValues]);

  useEffect(() => () => {
    if (dropOnUnmount) {
      dispatch(dropForm(name))
    }
  }, []);

  return (
    <form name={name} {...htmlFormProps}>
      <FormContext.Provider value={name}>
        {children}
      </FormContext.Provider>
    </form>
  );
});
