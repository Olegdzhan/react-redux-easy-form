// @flow

import type { TEasyFormHocValuesField } from './TEasyFormHocValuesField';
import type { TEasyFormHocFormErrors } from './TEasyFormHocFormErrors';
import type { TEasyFormFieldConfig } from './TEasyFormFieldConfig';

export type TEasyFormHocActions = {
    setValue: (fieldKey: string, value: any) => void;
    setInitialValues: (initialValues: TEasyFormHocValuesField) => void;
    setEmptyValues: (fieldsConfig: { [k: string]: TEasyFormFieldConfig }) => void;
    validateField: (fieldKey: string, error: string | null) => void;
    validateForm: (errors: TEasyFormHocFormErrors) => void;
    dropForm: (keepInitials?: boolean) => void;
    makeDirty: (fieldKey: string) => void;
    makePristine: (fieldKey: string) => void;
    clearFieldError: (fieldKey: string) => void;
    clearFormErrors: () => void;
};
