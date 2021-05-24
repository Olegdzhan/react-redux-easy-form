import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { EEasyFormField } from '../enums';
import { FormContext } from '../form-context';
import { RootValidator } from '../root-validator';
import { createGetFormStateFieldData } from '../selectors';
import { TPseudoAnyEnum, TValidator } from '../types';

interface IFieldConfig {
  providedFormStateFields?: EEasyFormField[];
  validators?: TValidator[];
}

export const useField = (
  fieldName: TPseudoAnyEnum,
  {
    providedFormStateFields,
    validators,
  }: IFieldConfig = {},
) => {
  const formName = useContext(FormContext);
  if (!formName) {
    throw new ReferenceError(`It seems either you try to call useField hook for ${fieldName} field out of any Form
component, or did not set a formName to Form you provide.`);
  }
  if (validators) {
    const rootValidator = new RootValidator(formName);
    rootValidator.applyFieldValidators(fieldName, validators);
  }
  const fieldData = useSelector(createGetFormStateFieldData(formName, fieldName, providedFormStateFields));

  const validate = useCallback(() => {}, [fieldData[EEasyFormField.Values]]);
};
