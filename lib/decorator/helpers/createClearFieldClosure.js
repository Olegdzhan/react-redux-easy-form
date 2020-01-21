// @flow

import type { TEasyFormHocProps } from '../TEasyFormHocProps';
import type { TEasyFormConfig } from '../TEasyFormConfig';

type TClearFieldClosure = (fieldKey: string) => () => void;

export default (
    formConfig: TEasyFormConfig,
    props: TEasyFormHocProps,
): TClearFieldClosure => (fieldKey: string) => (): void  => {
    const {
        form: {
            statuses,
        },
        formActions: {
            setValue,
            makeDirty,
        },
    } = props;
    setValue(fieldKey, null);
    if (statuses === 'pristine') {
        makeDirty(fieldKey);
    }
};