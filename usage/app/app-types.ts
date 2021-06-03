import { TForms } from '@/src';
import { EContactsFieldName } from './contacts';
import { EProfileFieldName, ESexValue } from './profile';
import { EFormName } from './app-enums';

export type TAppForms = {
  [EFormName.Profile]: {
    [EProfileFieldName.Age]: number | null;
    [EProfileFieldName.FullName]: string | null;
    [EProfileFieldName.Sex]: ESexValue | null;
  };
  [EFormName.Contacts]: {
    [K in EContactsFieldName]: string | null;
  };
};

export type TFormsState = TForms<EFormName, TAppForms>;

export type TResponseState = {
  [k: string]: any;
};

export type TAppState = {
  forms: TFormsState;
  response: TResponseState;
};
