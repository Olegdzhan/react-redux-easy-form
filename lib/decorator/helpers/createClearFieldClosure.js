// @flow
import type { TEasyFormHocProps } from '../../types/TEasyFormHocProps';
import type { TEasyFormConfig } from '../../types/TEasyFormConfig';
import { FieldStatus } from '../../constants';

type TClearFieldClosure = (fieldKey: string) => () => void;

export default (
  formConfig: TEasyFormConfig,
  getProps: () => TEasyFormHocProps,
): TClearFieldClosure => (fieldKey: string) => (): void => {
  const {
    form: {
      statuses,
    },
    formActions: {
      setValue,
      makeDirty,
    },
  } = getProps();
  if (statuses[fieldKey] === FieldStatus.Pristine) {
    makeDirty(fieldKey);
  }
  setValue(fieldKey, formConfig.fields[fieldKey].emptyValue);
};
