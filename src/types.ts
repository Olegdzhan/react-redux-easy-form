import { EEasyFormFieldStatus, EEasyFormField } from './enums';

export type TPseudoAnyEnum = string | number;

export type TObjectWithEnumKeys = {
  [FieldName in TPseudoAnyEnum]?: any;
};

export type TEasyFormStatuses<FormStruct> = {
  [FieldName in keyof FormStruct]: EEasyFormFieldStatus;
};

export type TEasyFormFieldErrors<FormStruct> = {
  [FieldName in keyof FormStruct]?: string[] | null;
};

export type TEasyForm<FormStruct> = {
  [EEasyFormField.Values]?: Partial<FormStruct>;
  [EEasyFormField.Initials]?: Partial<FormStruct>;
  [EEasyFormField.Statuses]?: TEasyFormStatuses<FormStruct>;
  [EEasyFormField.FieldErrors]?: TEasyFormFieldErrors<FormStruct>;
  [EEasyFormField.FormErrors]?: string[] | null;
};

export type TForms<
  EnumFormName extends TPseudoAnyEnum = TPseudoAnyEnum,
  U extends { [FormName in EnumFormName]?: { [k: string]: any } } = {}
> = {
  [FormName in EnumFormName]?: TEasyForm<U[FormName]>;
};

export type TEasyFormErrors<EnumFormName extends TPseudoAnyEnum = TPseudoAnyEnum> = {
  [FormName in EnumFormName]?: string[] | null;
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

export type TValidator = (value: any) => string | null;

export type TFormValidator = (values: { [P in TPseudoAnyEnum]?: any }) => string[] | null;

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
