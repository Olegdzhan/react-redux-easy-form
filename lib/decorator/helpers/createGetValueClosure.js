// @flow

import type { TEasyFormHocProps } from '../TEasyFormHocProps';
import type { TEasyFormConfig } from '../TEasyFormConfig';

type TGetValueClosure = (fieldKey: string) => () => any;

export default (
    formConfig: TEasyFormConfig,
    props: TEasyFormHocProps,
): TGetValueClosure => (fieldKey: string) => (): any  => {
    const { fields } = formConfig;
    const theField = fields[fieldKey];

    const {
        form: {
            currentValues,
            initialValues,
            statuses
        }
    } = this.props;

    return statuses[key] === 'pristine'
        ? currentValues[key] || initialValues[key] || defaultValue
        : currentValues[key] || defaultValue;
};