// @flow

export type TSetMethodsOverFieldsConfig = {
    changeValueClosure: (fieldKey: string) => (event: Object) => void;
    clearFieldClosure: (fieldKey: string) => () => void;
    clearErrorClosure: (fieldKey: string) => () => void;
    getValidatorClosure: (fieldKey: string) => () => void;
    setInitialValue: (fieldKey: string) => any;
};