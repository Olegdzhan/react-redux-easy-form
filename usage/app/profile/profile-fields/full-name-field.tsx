import React, { memo } from 'react';
import { IFieldConfig, useField } from '@/src';
import { EProfileFieldName } from '../profile-enums';
import { ProfileFieldsValidator } from './profile-fields-validator';

const fieldConfig: IFieldConfig = {
  changeValueGetter: (event: any): string => event.target.value,
  validators: [
    ProfileFieldsValidator.validateFullNameSpace,
    ProfileFieldsValidator.validateFullNamePartialsLength,
    ProfileFieldsValidator.validateFullNameIdentity,
  ],
};

export const FullNameField = memo(() => {
  const {
    errors,
    onChange,
    validate,
    value,
  } = useField<string>(EProfileFieldName.FullName, fieldConfig);

  return (
    <div>
      <label htmlFor={EProfileFieldName.FullName}>
        Full name
      </label>
      <input
        name={EProfileFieldName.FullName}
        onBlur={validate}
        onChange={onChange}
        type="text"
        value={value ?? ''}
      />
      {errors && (
        <ul>
          {errors.map((err: string) => (
            <li key={err} style={{ color: 'red' }}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
});
