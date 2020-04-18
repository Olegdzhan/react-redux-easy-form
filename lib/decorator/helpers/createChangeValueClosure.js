// @flow
import type { SyntheticInputEvent } from 'react-dom';
import type { TEasyFormHocProps } from '../../types/TEasyFormHocProps';
import type { TEasyFormConfig } from '../../types/TEasyFormConfig';
import { FieldStatus } from '../../constants';

type TChangeValueClosure = (fieldKey: string) => (event: SyntheticInputEvent) => void;

const defaultOnChange = (event: SyntheticInputEvent): any => event.target.value;

export default (
  formConfig: TEasyFormConfig,
  getProps: () => TEasyFormHocProps,
): TChangeValueClosure => (fieldKey: string) => (event: SyntheticInputEvent): void => {
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
  } = getProps();
  setValue(fieldKey, value);
  if (statuses === FieldStatus.Pristine) {
    makeDirty(fieldKey);
  }
  if (theField.validateOnChange && theField.validator) {
    validateField(fieldKey, theField.validator(value));
  }
};
