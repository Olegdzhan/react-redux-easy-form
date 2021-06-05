import { TProfileForm } from '../app-types';
import { RETIRE_AGE_MAP } from './profile-constants';
import { EProfileFieldName } from './profile-enums';

export const profileFormValidator = (formValues: TProfileForm): string[] | null => {
  const validationResult: string[] = [];

  const age = Number(formValues[EProfileFieldName.Age]);
  const gender = formValues[EProfileFieldName.Sex];

  const controlAge = RETIRE_AGE_MAP[gender];

  if (age >= controlAge) {
    validationResult.push('Retired person is not allowed');
  }

  return validationResult.length ? validationResult : null;
};
