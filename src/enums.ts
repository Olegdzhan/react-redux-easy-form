export enum EEasyFormActionType {
  ClearFieldValue = '[easyForm]:CLEAR_FIELD_VALUE',
  ClearFieldErrors = '[easyForm]:CLEAR_FIELD_ERRORS',
  DropForm = '[easyForm]:DROP_FORM',
  InitiateForm = '[easyForm]:INITIATE_FORM',
  SetFieldErrors = '[easyForm]:SET_FIELD_ERRORS',
  SetFieldStatus = '[easyForm]:SET_FIELD_STATUS',
  SetFieldValue = '[easyForm]:SET_FIELD_VALUE',
  SetFormErrors = '[easyForm]:SET_FORM_ERRORS',
}

export enum EEasyFormFieldStatus {
  Dirty = 'dirty',
  Pristine= 'pristine',
}

export enum EEasyFormField {
  FieldErrors = 'fieldErrors',
  FormErrors = 'formErrors',
  Initials = 'initials',
  Statuses = 'statuses',
  Values = 'values',
}
