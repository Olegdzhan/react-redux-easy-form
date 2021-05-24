import React from 'react';
import { useDispatch } from 'react-redux';
import { initiateForm } from '../action-creators';
import { FormContext } from '../form-context';
import { RootValidator } from '../root-validator';
import { TFormValidator, TPseudoAnyEnum } from '../types';

interface IFormProps {
  children: React.ReactNode;
  initialValues: { [P in TPseudoAnyEnum]: any };
  formName: TPseudoAnyEnum;
  onSubmit: (event: React.SyntheticEvent) => void;
  validate?: TFormValidator;
}

export const Form = React.memo<IFormProps>(({
  children,
  initialValues,
  formName,
  onSubmit,
  validate,
}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initiateForm(formName, initialValues));
    if (validate) {
      const rootValidator = new RootValidator(formName);
      rootValidator.applyFormValidator(validate);
    }
  }, []);

  return (
    <form
      name={formName as string}
      onSubmit={onSubmit}
    >
      <FormContext.Provider value={formName}>
        {children}
      </FormContext.Provider>
    </form>
  );
});
