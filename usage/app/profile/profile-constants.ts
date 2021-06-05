import { TOption } from '../app-types';
import { ESexValue } from './profile-enums';

export const GENDER_SELECT_OPTIONS: TOption[] = [
  {
    label: 'empty',
    value: ESexValue.Empty,
  },
  {
    label: 'Male',
    value: ESexValue.Male,
  },
  {
    label: 'Female',
    value: ESexValue.Female,
  },
];

export const RETIRE_AGE_MAP: { [K in ESexValue]?: number } = {
  [ESexValue.Male]: 60,
  [ESexValue.Female]: 55,
};
