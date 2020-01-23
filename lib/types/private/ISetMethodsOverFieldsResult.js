// @flow

export interface ISetMethodsOverFieldsResult {
    changers: { [fieldKey: string]: (event: Object) => void };
    clears: { [fieldKey: string]: () => void };
    clearError: { [fieldKey: string]: () => void };
    initialValues: { [fieldKey: string]: any };
    validators: { [fieldKey: string]: () => void };
}
