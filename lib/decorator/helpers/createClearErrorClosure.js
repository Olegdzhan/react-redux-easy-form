// @flow

import type { TEasyFormHocProps } from '../../types/TEasyFormHocProps';
import type { TEasyFormConfig } from '../../types/TEasyFormConfig';

type TClearErrorClosure = (fieldKey: string) => () => void;

export default (
  formConfig: TEasyFormConfig,
  getProps: () => TEasyFormHocProps,
): TClearErrorClosure => (fieldKey: string) => (): void => {
  const {
    formActions: {
      clearFieldError,
    },
  } = getProps();
  clearFieldError(fieldKey);
};
