// @flow

export type { State } from 'redux';

export type TEasyFormFieldConfig = {
    initialValue: any | Array<any>;
    validateOnChange?: boolean;
    errorMessage?: string;
    validator?: (val: any) => string | null;
};

export type TEasyFormConfig = {
    formName: string;
    fields: { [k: string]: TEasyFormFieldConfig };
    formValidator: (args: any) => string[] | null;
    getFormsFrom: Function;
};
