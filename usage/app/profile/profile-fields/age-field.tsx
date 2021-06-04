import React, { memo } from 'react';
import { IFieldConfig, useField } from '@/src';
import { EProfileFieldName } from '../profile-enums';
import { ProfileFieldsValidator } from './profile-fields-validator';

const fieldConfig: IFieldConfig = {
  changeValueGetter: (event: any): string => event.target.value,
  validateOnChange: true,
  validators: [
    ProfileFieldsValidator.validateMaxAge,
  ],
};

export const AgeField = memo(() => {
  const {
    errors,
    onChange,
    value,
  } = useField<string>(EProfileFieldName.Age, fieldConfig);

  return (
    <div>
      <label htmlFor={EProfileFieldName.Age}>
        Age (years)
      </label>
      <input
        name={EProfileFieldName.Age}
        onChange={onChange}
        type="number"
        value={value}
      />
      {errors && (
        <ul>
          {errors.map((err: string) => (
            <li style={{ color: 'red' }}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
});
