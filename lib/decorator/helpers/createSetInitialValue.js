// @flow

import type { TEasyFormHocProps } from '../TEasyFormHocProps';
import type { TEasyFormConfig } from '../TEasyFormConfig';

type TCreateSetInitialValue = (fieldKey: string) => any;

export default (
    formConfig: TEasyFormConfig,
    props: TEasyFormHocProps,
): TCreateSetInitialValue => (fieldKey: string): any => {
    const { fields } = formConfig;
    const theField = fields[fieldKey];
    if (theField.type) {
        console.warn('@easy-form: the field property "type" has been deprecated since v.1.0.0 and takes no effect in calculations');
    }
    const { initialValue } = theField;
    if (typeof initialValue === 'function') {
        return initialValue(props);
    }
    return initialValue;
};
