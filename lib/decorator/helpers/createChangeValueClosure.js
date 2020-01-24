// @flow

import type { TEasyFormHocProps } from '../../types/TEasyFormHocProps';
import type { TEasyFormConfig } from '../../types/TEasyFormConfig';

type TChangeValueClosure = (fieldKey: string) => (event: Object) => void;

const defaultOnChange = (event: Object): any => event.target.value;

export default (
  formConfig: TEasyFormConfig,
  props: TEasyFormHocProps,
): TChangeValueClosure => (fieldKey: string) => (event: Object): void => {
  const { fields } = formConfig;
  const theField = fields[fieldKey];
  const onChange = theField.onChange || defaultOnChange;
  const value = onChange(event);
  const {
    form: {
      statuses,
    },
    formActions: {
      validateField,
      setValue,
      makeDirty,
    },
  } = props;
  setValue(fieldKey, value);
  if (statuses === 'pristine') {
    makeDirty(fieldKey);
  }
  if (theField.validateOnChange && theField.validator) {
    validateField(fieldKey, theField.validator(value));
  }
};
