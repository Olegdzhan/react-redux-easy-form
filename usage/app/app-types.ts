import { TShape } from '@/src';
import { EContactsFieldName } from './contacts';
import { EProfileFieldName, ESexValue } from './profile';
import { EFormName } from './app-enums';

export type TProfileForm = {
  [EProfileFieldName.Age]: number | null | undefined;
  [EProfileFieldName.FullName]: string | null | undefined;
  [EProfileFieldName.Sex]: ESexValue | null | undefined;
};

export type TContactsForm = {
  [K in EContactsFieldName]: string | null | undefined;
};

export type TAppForms = {
  [EFormName.Profile]: TProfileForm;
  [EFormName.Contacts]: TContactsForm;
};

export type TResponseState = {
  fullName?: string;
};

export type TAppState = {
  forms: TShape;
  response: TResponseState;
};

export type TOption = {
  label: string;
  value: string;
};
