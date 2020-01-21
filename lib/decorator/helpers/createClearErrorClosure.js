// @flow

import type { TEasyFormHocProps } from '../TEasyFormHocProps';
import type { TEasyFormConfig } from '../TEasyFormConfig';

type TClearErrorClosure = (fieldKey: string) => () => void;

export default (
    formConfig: TEasyFormConfig,
    props: TEasyFormHocProps,
): TClearErrorClosure => (fieldKey: string) => (): void  => {
    const {
        formActions: {
            clearFieldError,
        },
    } = props;
    clearFieldError(fieldKey);
};
