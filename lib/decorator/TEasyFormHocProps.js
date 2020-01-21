// @flow

export type TEasyFormHocValuesField = {
    [k: string]: any;
};

export type TEasyFormHocErrorsField = {
    [k: string]: string | null;
};

export type TEasyFormHocStatusesField = { [k: string]: 'pristine' | 'dirty' };

export type TEasyFormHocActions = {
    setValue: (fieldKey: string, value: any) => void;
    setInitialValues: (initialValues: TEasyFormHocValuesField) => void;
    validateField: (fieldKey: string, error: string | null) => void;
    validateForm: (errors: string[] | null) => void;
    dropForm: (keepInitials?: boolean) => void;
    makeDirty: (fieldKey: string) => void;
    makePristine: (fieldKey: string) => void;
    clearFieldError: (fieldKey: string) => void;
    clearFormErrors: () => void;
};

export type TFormStructuredProps = {
    values: TEasyFormHocValuesField;
    initialValues: TEasyFormHocValuesField;
    fieldErrors: TEasyFormHocErrorsField;
    formErrors: string[] | null;
    statuses: TEasyFormHocStatusesField;
};

export type TEasyFormHocProps = {
    form: TFormStructuredProps;
    formActions: TEasyFormHocActions;
};
