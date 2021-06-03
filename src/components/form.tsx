import React from 'react';
import { useDispatch } from 'react-redux';
import { initiateForm } from '../action-creators';
import { FormContext } from '../form-context';
import { RootValidator } from '../root-validator';
import { TFormValidator, TPseudoAnyEnum } from '../types';

interface IFormProps {
  children: React.ReactNode;
  className?: string;
  initialValues?: { [P in TPseudoAnyEnum]: any };
  name: TPseudoAnyEnum;
  onSubmit?: (event: React.SyntheticEvent) => void;
  validate?: TFormValidator;
}

export const Form = React.memo<IFormProps>(({
  children,
  className,
  initialValues= {},
  name,
  onSubmit,
  validate,
}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initiateForm(name, initialValues));
    if (validate) {
      const rootValidator = new RootValidator(name);
      rootValidator.applyFormValidator(validate);
    }
  }, []);

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
