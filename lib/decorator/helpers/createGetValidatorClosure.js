// @flow

import type { TEasyFormHocProps } from '../../types/TEasyFormHocProps';
import type { TEasyFormConfig } from '../../types/TEasyFormConfig';

type TGetValidatorClosure = (fieldKey: string) => () => void;

export default (
  formConfig: TEasyFormConfig,
  getProps: () => TEasyFormHocProps,
): TGetValidatorClosure => (fieldKey: string) => (): void => {
  const { fields } = formConfig;
  const theField = fields[fieldKey];
  const {
    form: {
      values,
    },
    formActions: {
      validateField,
    },
  } = getProps();
  if (theField.validator) {
    validateField(fieldKey, theField.validator(values[fieldKey]));
  }
};
