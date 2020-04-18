// @flow

import type { TFormStructuredProps } from './TFormStructuredProps';
import type { TEasyFormHocActions } from './TEasyFormHocActions';
import type { TEasyFormValidateConfig } from './TEasyFormValidateConfig';

export type TEasyFormHocProps = {
    form: TFormStructuredProps;
    formActions: TEasyFormHocActions;
    setters: { [fieldName: string]: (value: any) => any };
    removers: { [fieldName: string]: () => void };
    validators: { [fieldName: string]: () => void };
    clearError: { [fieldName: string]: () => void };
    validateAll: (config?: TEasyFormValidateConfig) => boolean;
};
