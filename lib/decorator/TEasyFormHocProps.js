// @flow

export type TEasyFormHocValuesField = {
    [k: string]: any;
};

export type TEasyFormHocInitialValuesField = {
    [k: string]: string | number | boolean | Object | (props: { [k: string]: any }) => any;
};

export type TEasyFormHocErrorsField = {
    [k: string]: string | null;
};

export type TEasyFormHocStatusesField = 'pristine' | 'dirty';

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

export type TEasyFormHocProps = {
    form: {
        currentValues: TEasyFormHocValuesField;
        initialValues: TEasyFormHocInitialValuesField;
        fieldErrors: TEasyFormHocErrorsField;
        formErrors: string[] | null;
        statuses: TEasyFormHocStatusesField;
    };
    formActions: TEasyFormHocActions;
};
