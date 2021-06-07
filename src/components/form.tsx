import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initiateForm } from '../action-creators';
import { FormContext } from '../form-context';
import { RootValidator } from '../root-validator';
import { TFormValidator, TShape } from '../types';

interface IFormProps {
  children: React.ReactNode;
  className?: string;
  initialValues?: TShape;
  name: string;
  onSubmit?: (event: React.SyntheticEvent) => void;
  validate?: TFormValidator;
}

export const Form = memo<IFormProps>(({
  children,
  className,
  initialValues= {},
  name,
  onSubmit,
  validate,
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

  return (
    <form
      className={className}
      name={name as string}
      onSubmit={onSubmit}
    >
      <FormContext.Provider value={name}>
        {children}
      </FormContext.Provider>
    </form>
  );
});
