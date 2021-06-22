import React, { ChangeEvent, memo } from 'react';
import { IFieldConfig, useField } from '@/src';
import { TOption } from '../../app-types';
import { GENDER_SELECT_OPTIONS } from '../profile-constants';
import { EProfileFieldName, ESexValue } from '../profile-enums';

const fieldConfig: IFieldConfig = {
  changeValueGetter: (event: ChangeEvent<HTMLSelectElement>): ESexValue => event.target.value as ESexValue,
};

export const GenderField = memo(() => {
  const {
    clear,
    onChange,
    value,
  } = useField<ESexValue>(EProfileFieldName.Sex, fieldConfig);

  return (
    <div>
      <label htmlFor={EProfileFieldName.Sex}>
        Gender
      </label>
      <select
        name={EProfileFieldName.Sex}
        onChange={onChange}
        value={value ?? ESexValue.Empty}
      >
        {GENDER_SELECT_OPTIONS.map((option: TOption) => (
          <option
            key={option.value}
            value={option.value}
          >{option.label}</option>
        ))}
      </select>
      <button type="button" onClick={clear}>
        Clear Field
      </button>
    </div>
  );
})
