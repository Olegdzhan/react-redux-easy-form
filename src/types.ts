import { EEasyFormFieldStatus, EEasyFormField } from './enums';

export type TShape = { [k: string]: any };

export type TEasyFormStatuses = {
  [k: string]: EEasyFormFieldStatus;
};

export type TEasyFormFieldErrors<FormStruct extends TShape = TShape> = {
  [FieldName in keyof FormStruct]?: string[] | null;
};

export type TEasyForm<FormStruct extends TShape = TShape> = {
  [EEasyFormField.Values]?: Partial<FormStruct>;
  [EEasyFormField.Initials]?: Partial<FormStruct>;
  [EEasyFormField.Statuses]?: TEasyFormStatuses;
  [EEasyFormField.FieldErrors]?: TEasyFormFieldErrors<FormStruct>;
  [EEasyFormField.FormErrors]?: string[] | null;
};

export type TForms = {
  [k: string]: TEasyForm;
};

export type TEasyFormErrors = {
  [k: string]: string[] | null;
} & {
  [EEasyFormField.FormErrors]?: string[] | null;
};

export type TFormFieldStruct<Value> = {
  [EEasyFormField.Values]?: Value;
  [EEasyFormField.Initials]?: Value;
  [EEasyFormField.Statuses]?: EEasyFormFieldStatus;
  [EEasyFormField.FieldErrors]?: string[] | null;
  [EEasyFormField.FormErrors]?: string[] | null;
};

export type TValidator = (value: any, state?: any) => string | null;

export type TFormValidator = (values: any, state?: any) => string[] | null;

export type TUseFieldSubscription<V> = {
  clear: () => void;
  errors: string[] | null | undefined;
  isFieldValid: boolean;
  isPristine: boolean;
  onChange: (value: any) => void;
  validate: () => void;
  value: V | null;
};

export interface IFieldConfig {
  changeValueGetter?: (onChangeCallbackArg: any) => any;
  validateOnChange?: boolean;
  validators?: TValidator[];
}
