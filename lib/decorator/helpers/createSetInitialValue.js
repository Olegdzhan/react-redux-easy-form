// @flow
import type { TEasyFormHocProps } from '../../types/TEasyFormHocProps';
import type { TEasyFormConfig } from '../../types/TEasyFormConfig';

type TCreateSetInitialValue = (fieldKey: string) => any;

export default (
  formConfig: TEasyFormConfig,
  getProps: () => TEasyFormHocProps,
): TCreateSetInitialValue => (fieldKey: string): any => {
  const { fields } = formConfig;
  const theField = fields[fieldKey];
  // $FlowFixMe
  if (theField.type) {
    console.warn('@easy-form: the field property "type" has been deprecated since v.1.0.0 and takes no effect in calculations');
  }
  const { initialValue } = theField;
  if (typeof initialValue === 'function') {
    return initialValue(getProps());
  }
  return initialValue;
};
