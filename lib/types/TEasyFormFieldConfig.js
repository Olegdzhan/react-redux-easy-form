// @flow

import type { TEasyFormFieldValidator } from './TEasyFormFieldValidator';

export type TEasyFormFieldConfig = {
  emptyValue: any;
  initialValue: any;
  onChange?: (val: any) => any;
  validateOnChange?: boolean;
  validator?: TEasyFormFieldValidator;
};
