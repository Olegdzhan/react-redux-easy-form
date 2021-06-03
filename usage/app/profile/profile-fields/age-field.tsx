import React, { memo } from 'react';
import { IFieldConfig, useField } from '@/src';
import { EProfileFieldName } from '../profile-enums';

const fieldConfig: IFieldConfig = {
  changeValueGetter: (event: any): string => event.target.value,
  validators: [
    (value: string): string | null => Number(value) > 99 ? 'Must be less than 99' : null,
    (value: string): string | null => Number(value) % 2 === 0 ? 'Must be an odd number' : null,
  ],
};

export const AgeField = memo(() => {
  const {
    onChange,
    validate,
    value,
  } = useField<string>(EProfileFieldName.Age, fieldConfig);

  return (
    <input
      name={EProfileFieldName.Age}
      onBlur={validate}
      onChange={onChange}
      type="number"
      value={value}
    />
  );
});
