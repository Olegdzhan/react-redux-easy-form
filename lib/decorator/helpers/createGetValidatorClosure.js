// @flow

import type { TEasyFormHocProps } from '../TEasyFormHocProps';
import type { TEasyFormConfig } from '../TEasyFormConfig';

type TGetValidatorClosure = (fieldKey: string) => () => void;

export default (
    formConfig: TEasyFormConfig,
    props: TEasyFormHocProps,
): TGetValidatorClosure => (fieldKey: string) => (): void  => {
    const { fields } = formConfig;
    const theField = fields[fieldKey];
    if (theField.validator) {
        const {
            form: {
                values,
            },
            formActions: {
                validateField,
            },
        } = props;
        validateField(fieldKey, theField.validator(values[fieldKey]));
    }
};
